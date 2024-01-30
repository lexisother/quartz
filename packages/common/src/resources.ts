export function loadScript(
  url: string,
  options?: { type?: string | null; async?: boolean | null } | null,
): Promise<void> {
  return new Promise((resolve, reject) => {
    options = options ?? {};
    let script = document.createElement('script');
    script.src = url;
    if (options.type != null) script.type = options.type;
    if (options.async != null) script.async = options.async;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script '${url}'`));
    document.body.appendChild(script);
  });
}
