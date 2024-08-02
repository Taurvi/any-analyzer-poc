import { SyntaxKind } from "typescript";
import { TypeAnalyzer } from "./type/TypeAnalyzer";

(async () => {
    const analyzer = new TypeAnalyzer();
    const query = SyntaxKind.AnyKeyword;
    const queryName = SyntaxKind[SyntaxKind.AnyKeyword];
    console.log(`Searching code for ${queryName}`);

    const response = await analyzer.analyze(query);

    console.log("Search complete.");
    console.log(`  Found ${queryName} in ${response.details.length} files.`);
    for (const details of response.details) {
        if (!details.success) {
            console.log(`Erorr processing file: ${details.error}`);
            continue;
        }
        console.log(`    ${details.filePath}`);
        for (const anyReference of details.anyReferences) {
            console.log(`      - ${anyReference}`);
        }
    }
})();
