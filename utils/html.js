const map = {
  "<": "&lt;",
  ">": "&gt;",
  "&": "&amp;",
};
export const html = (string) => string.replace(/[\<\>\&]/g, (m) => map[m]);
