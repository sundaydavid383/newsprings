import re
def extract_references(text):
    pattern = r'([1-3]?\s?[A-Za-z]+)\s+(\d+):(\d+)'
    matches = re.findall(pattern, text)
    references = []

    for match in matches:
        book = match[0].strip()
        chapter = int(match[1])
        verse = int(match[2])
        references.append({
            'book':book,
            'chapter':chapter,
            'verse':verse
        })
    return references