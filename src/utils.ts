// See: http://stackoverflow.com/a/2117523/385507
export function generateGuid(): string {
    return 'xxxxxxxx'.replace(/x/g, function(c) {
        const r = Math.random() * 16 | 0, v = r;
        return v.toString(16);
    });
}
