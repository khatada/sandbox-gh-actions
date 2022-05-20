import * as core from "@actions/core";
import * as glob from "@actions/glob";
import * as path from "path";
import * as fs from "fs-extra";

async function checkFileMark (mark: string) {
    core.info(`Check if all source file contains mark "${mark}"`);

    const customIgnorePatternText = core.getInput("ignore-files", { required: false, trimWhitespace: true });
    const customIgnorePattern = customIgnorePatternText.split(",").map(token => token.trim()).filter(token => token.length > 0);

    const ignoreDirectories = [
        "build",
        "dist",
        "public",
        ".github",
        ".vscode",
    ];
    const ignorePatterns = [
        ".min.js",
        ".d.ts",
        ".eslintrc.js",
        ".prettierrc.js",
    ];
    if (customIgnorePattern.length) {
        core.info(`Custom ignore pattern. ${customIgnorePattern.join("|")}`);
        ignorePatterns.push(...customIgnorePattern);
    }
    const patterns = [
        "**/*.tsx",
        "**/*.ts",
        "**/*.js",
        "**/*.jsx"
    ];
    const globber = await glob.create(patterns.join("\n"), { followSymbolicLinks: false, matchDirectories: false })
    const files = await globber.glob();

    let errorCount = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
        // 無視ディレクトリに該当する場合は対象外
        if (ignoreDirectories.some(directory => file.includes(`/${directory}/`))) {
            // eslint-disable-next-line no-continue
            continue;
        }

        const name = path.basename(file);
        // 無視ファイル名に該当する場合は対象外
        if (ignorePatterns.some(pattern => name.includes(pattern))) {
            // eslint-disable-next-line no-continue
            continue;
        }

        // eslint-disable-next-line no-await-in-loop
        const content = await fs.readFile(file, { encoding: "UTF-8" });
        // 秘密情報表示が含まれるか確認
        if (content.includes(mark)) {
            // OK
        } else {
            core.error(`${file} does not contain: "${mark}"`);
            errorCount += 1;
        }
    }

    if (errorCount > 0) {
        throw new Error(`${errorCount} file(s) do not contain mark "${mark}"`);
    }

}

async function run(): Promise<void> {
    try {
        await checkFileMark("* Copyright ");
    } catch (error: any) {
        core.setFailed(error.message);
    }
}

run();