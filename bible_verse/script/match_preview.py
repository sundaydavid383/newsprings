import json
import difflib
import time 
import os
import re
import threading
import speech_recognition as sr


# Load Bible data
script_dir = os.path.dirname(__file__)
file_path = os.path.join(script_dir, '..', 'data', 'en_kjv.json' )
with open(file_path, 'r', encoding='utf-8') as file:
        bible = json.load(file)




# Flatten all verses with refernce
verse_list = []
for book in bible:
    book_name = book['abbrev']
    for chap_num, chapter in enumerate(book['chapters'],1):
        for verse_num, verse_text in enumerate(chapter,1):
            ref = f"{book_name.upper()} {chap_num}:{verse_num}"
            verse_list.append((ref, verse_text.lower()))

# Speech recongizer setup
recognizer = sr.Recognizer()
mic = sr.Microphone()


# Debounce setUp
speech_buffer = []
lock = threading.Lock()

def process_buffer():
    while True:
        time.sleep(3)
        with lock:
            if not speech_buffer:
                continue
            last_words = " ".join(speech_buffer[-10:]).lower()
            best_match = None
            highest_ratio = 0
            for ref,verse in verse_list:
                ratio = difflib.SequenceMatcher(None, last_words, verse).ratio()
                if ratio > 0.6 and ratio > highest_ratio:
                    highest_ratio = ratio
                    best_match = (ref, verse)
                if best_match:
                    print(f"\nMATCH FOUND: {best_match[0]} - {best_match[1]}")
                speech_buffer.clear()


book_map = {
         'genesis': 'GN', 'exodus': 'EX', 'leviticus': 'LV', 'numbers': 'NM', 'deuteronomy': 'DT',
    'joshua': 'JS', 'judges': 'JG', 'ruth': 'RT', '1samuel': '1SM', '2samuel': '2SM',
    '1kings': '1KI', '2kings': '2KI', '1chronicles': '1CH', '2chronicles': '2CH',
    'ezra': 'EZR', 'nehemiah': 'NE', 'esther': 'ES', 'job': 'JOB', 'psalms': 'PS',
    'proverbs': 'PR', 'ecclesiastes': 'EC', 'songofsolomon': 'SS', 'isaiah': 'IS',
    'jeremiah': 'JR', 'lamentations': 'LM', 'ezekiel': 'EZ', 'daniel': 'DN',
    'hosea': 'HS', 'joel': 'JL', 'amos': 'AM', 'obadiah': 'OB', 'jonah': 'JNH',
    'micah': 'MC', 'nahum': 'NA', 'habakkuk': 'HK', 'zephaniah': 'ZP', 'haggai': 'HG',
    'zechariah': 'ZC', 'malachi': 'ML',
    'matthew': 'MT', 'mark': 'MK', 'luke': 'LK', 'john': 'JN', 'acts': 'ACT',
    'romans': 'RM', '1corinthians': '1CO', '2corinthians': '2CO', 'galatians': 'GL',
    'ephesians': 'EPH', 'philippians': 'PHP', 'colossians': 'COL', '1thessalonians': '1TH',
    '2thessalonians': '2TH', '1timothy': '1TM', '2timothy': '2TM', 'titus': 'TIT',
    'philemon': 'PHM', 'hebrews': 'HB', 'james': 'JAS', '1peter': '1PE', '2peter': '2PE',
    '1john': '1JN', '2john': '2JN', '3john': '3JN', 'jude': 'JUD', 'revelation': 'RV'

}


def try_direct_reference(spoken_text):
    # Normalize text (e.g. "Matthew chapter 4 verse 2" -> matthew 4 2)
    spoken_text = spoken_text.lower().replace("chapter", "").replace("verse", "")
    words = spoken_text.split()

    for i in range(len(words)):
        for j in range(i+1, len(words)):
            possible_book = ''.join(words[i:j])
            if possible_book in book_map:
                abbrev = book_map[possible_book]
                try:
                    chapter = int(words[j])
                    verse  = int(words[j+1])
                    ref = f"{abbrev} {chapter}:{verse}"
                    # Find in verse_list
                    for vr_ref, vr_text in verse_list:
                        if vr_ref == ref:
                            print(f"\n📖 DIRECT REF MATCH: {vr_ref} - {vr_text} ")
                            return
                except:
                    continue


# Start debounce processor thread
threading.Thread(target=process_buffer, daemon=True).start()

# Start microphone listenng
print("🎤 Listening... Speak now.")
with mic as source:
    recognizer.adjust_for_ambient_noise(source)
    while True:
        try:
            audio = recognizer.listen(source, timeout=5)
            spoken = recognizer.recognize_google(audio)
            print(f"🗣️ You said : {spoken}")
            try_direct_reference(spoken)
            with lock:
                speech_buffer.extend(spoken.strip().split())
        except sr.WaitTimeoutError:
            continue
        except sr.UnknownValueError:
            print("😕 Didn't catch that.")
        except sr.RequestError as e:
            print(f"🔌 Could not request results; {e}")

           

                

