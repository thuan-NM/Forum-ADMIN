/**
 * Strips HTML tags from the provided content and removes extra whitespace.
 *
 * @param content - The string content potentially containing HTML tags.
 * @returns A clean string without HTML tags and extra whitespace.
 */

export function stripHTML(content: string): string {
  // Loại bỏ tất cả thẻ HTML
  const withoutTags = content.replace(/<[^>]+>/g, "");

  // Replace HTML entities &nbsp; hoặc ký tự non-breaking space
  const noEntities = withoutTags
    .replace(/&nbsp;/g, " ") // chuyển về space thường
    .replace(/\u00A0/g, " "); // hoặc kí tự Unicode U+00A0

  // Loại bỏ khoảng trắng thừa và trim
  const clean = noEntities.replace(/\s+/g, " ").trim();

  return clean;
}
