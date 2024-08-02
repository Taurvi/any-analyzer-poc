import { sync } from "glob";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import { createSourceFile, forEachChild, Node, ScriptTarget, SyntaxKind } from "typescript";

export type AnlyzerFileResult =
    | {
          success: false;
          error: unknown;
      }
    | {
          success: true;
          filePath: string;
          anyReferences: Array<string>;
      };

export type AnalyzerResult = {
    count: number;
    details: Array<AnlyzerFileResult>;
};

export interface IAnalyzer {
    analyze(syntaxType: SyntaxKind): Promise<AnalyzerResult>;
}

export class TypeAnalyzer implements IAnalyzer {
    readonly mainPath: string;
    readonly fileNames: Array<string>;

    constructor() {
        this.mainPath = cwd();
        this.fileNames = this.getFiles();
    }

    private getFiles(): Array<string> {
        return sync("**/*.ts", {
            ignore: ["**/node_modules/**", "**/dist/**", "**/analyzer/**"],
            cwd: this.mainPath,
        });
    }

    public async analyze(syntaxKind: SyntaxKind): Promise<AnalyzerResult> {
        const promises = this.fileNames.map(async (fileName) => await this.getSourceAndTraverse(syntaxKind, fileName));

        const settled = await Promise.allSettled(promises);
        let anyCount = 0;
        const details = settled.map((settledPromise) => this.processResults(settledPromise, anyCount));

        return {
            count: anyCount,
            details: details,
        };
    }

    private async getSourceAndTraverse(syntaxKind: SyntaxKind, fileName: string): Promise<AnlyzerFileResult> {
        try {
            const filePath = join(this.mainPath, fileName);
            const file = await readFile(filePath, "utf8");
            const ast = createSourceFile(fileName, file, ScriptTarget.ES2018, true);
            const response = new Array<string>();
            forEachChild(ast, (node) => this.traverseAst(syntaxKind, node, response));

            return {
                success: true,
                filePath: filePath,
                anyReferences: response,
            };
        } catch (error) {
            return {
                success: false,
                error: error,
            };
        }
    }

    private traverseAst(syntaxKind: SyntaxKind, node: Node, response: Array<string>): void {
        if (node.kind === syntaxKind) {
            response.push(node.getText());
        }
    }

    private processResults(settledPromise: PromiseSettledResult<AnlyzerFileResult>, anyCount: number): AnlyzerFileResult {
        if (settledPromise.status === "rejected") {
            // exceptional case -- everything should be caught
            console.log(settledPromise);
            throw new Error("Unknown error while processing");
        }
        const response = settledPromise.value;
        if (response.success) {
            anyCount += response.anyReferences.length;
        }
        return response;
    }
}
