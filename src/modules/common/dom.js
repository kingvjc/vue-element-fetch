export function fixTableHeight($tableEl, extra = 0) {
    const tableTop = $tableEl.getBoundingClientRect().top;
    const clientHeight = window.innerHeight;
    return clientHeight - tableTop - extra;
}
