import {
  normalizeHyphens,
  normalizePhoneNumber,
  normalizePostalCode,
  normalizeSpaces,
  toHalfWidth,
} from "@tora87/ja-form-normalize";
import "./style.css";

type Row = {
  name: string;
  note: string;
  run: (input: string) => string | null;
};

const rows: Row[] = [
  { name: "toHalfWidth", note: "全角の英数字・記号を半角に", run: toHalfWidth },
  { name: "normalizeHyphens", note: "ハイフン類を - に統一", run: normalizeHyphens },
  { name: "normalizeSpaces", note: "空白を整理", run: normalizeSpaces },
  { name: "normalizePostalCode", note: "郵便番号を 123-4567 に", run: normalizePostalCode },
  { name: "normalizePhoneNumber", note: "電話番号を数字だけに", run: normalizePhoneNumber },
];

const samples = [
  "〒１２３ー４５６７",
  "０９０－１２３４－５６７８",
  "　山田　　太郎 ",
  "ＡＢＣ１２３",
];

function mustGet<T extends HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} が見つかりません`);
  return el as T;
}

const input = mustGet<HTMLInputElement>("input");
const results = mustGet<HTMLTableSectionElement>("results");
const sampleBox = mustGet<HTMLDivElement>("samples");
const build = mustGet<HTMLSpanElement>("build");

// 結果の表を一度だけ組み立て、あとは戻り値のセルだけ書き換える
const outputs = rows.map((row) => {
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.scope = "row";
  const code = document.createElement("code");
  code.textContent = row.name;
  const note = document.createElement("span");
  note.className = "note";
  note.textContent = row.note;
  th.append(code, note);

  const td = document.createElement("td");
  const out = document.createElement("output");
  td.append(out);

  tr.append(th, td);
  results.append(tr);
  return { row, out };
});

function render(): void {
  for (const { row, out } of outputs) {
    const value = row.run(input.value);
    if (value === null) {
      out.textContent = "null（解釈できません）";
      out.className = "is-null";
    } else {
      // 前後の空白の有無が見えるよう、引用符で囲んで表示する
      out.textContent = JSON.stringify(value);
      out.className = "";
    }
  }
}

for (const sample of samples) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = sample.trim();
  button.addEventListener("click", () => {
    input.value = sample;
    render();
    input.focus();
  });
  sampleBox.append(button);
}

input.addEventListener("input", render);
input.value = samples[0] ?? "";
render();

// GitHub Actions でビルドしたときだけ、どのコミットから作られたかを表示する
const sha = import.meta.env.VITE_COMMIT_SHA;
build.textContent = sha ? `デプロイ元のコミット: ${sha.slice(0, 7)}` : "ローカルでビルド";
