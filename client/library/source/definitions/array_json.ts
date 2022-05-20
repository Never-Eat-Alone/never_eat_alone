export function arrayFromJson<T>(builder: any, list: any[]): T[] {
  if (!list || list.length === 0) {
    return [];
  }
  const result = [];
  for (const jsonObject of list) {
    result.push(builder.fromJson(jsonObject));
  }
  return result;
}

export function arrayToJson(objects: any[]): any[] {
  if (!objects || objects.length === 0) {
    return [];
  }
  const result = [];
  for (const object of objects) {
    result.push(object.toJson());
  }
  return result;
}
