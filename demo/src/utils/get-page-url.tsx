export function getPageUrl(page: string): string {
	return `/${page.replace(/\s/g, "-").toLowerCase()}`;
}
