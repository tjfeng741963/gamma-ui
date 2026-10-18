import { describe, expect, it } from "vitest";

import * as api from "../src/index";

/*
 * 公开 API 快照：删掉或改名一个导出，CI 就会在这里失败。
 * 确实要改时，同步更新 CHANGELOG 再 `pnpm vitest -u` 重录快照。
 */
describe("公开 API", () => {
    it("导出名与快照一致", () => {
        expect(Object.keys(api).sort()).toMatchSnapshot();
    });
});
