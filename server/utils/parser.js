export function tryParseJSON(raw) {
  if (!raw || typeof raw !== "string") return null;

  // strip code fences ```json ... ```
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const text = fenced ? fenced[1] : raw;

  // attempt direct parse
  try {
    return JSON.parse(text);
  } catch {}

  // try to salvage by trimming to the outermost JSON array/object
  const firstObj = text.indexOf("{");
  const lastObj = text.lastIndexOf("}");
  const firstArr = text.indexOf("[");
  const lastArr = text.lastIndexOf("]");

  const haveObj = firstObj !== -1 && lastObj !== -1;
  const haveArr = firstArr !== -1 && lastArr !== -1;

  const candidate = haveArr
    ? text.slice(firstArr, lastArr + 1)
    : haveObj
    ? text.slice(firstObj, lastObj + 1)
    : text;

  try {
    return JSON.parse(candidate);
  } catch (e) {
    console.error("JSON parse failed:", e.message);
    return null;
  }
}
