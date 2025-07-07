import os
import datetime

class Note:
    def __init__(self, title, body, shift=3):
        self.title = title
        self.body = body
        self.date = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.shift = shift  # used for encryption

    def encrypt(self):
        # Caesar cipher: shift each character forward
        encrypted = ""
        for char in self.body:
            if char.isalpha():
                base = ord('A') if char.isupper() else ord('a')
                encrypted += chr((ord(char) - base + self.shift) % 26 + base)
            else:
                encrypted += char
        return encrypted

    def decrypt(self, encrypted_text):
        # Caesar cipher: shift each character backward
        decrypted = ""
        for char in encrypted_text:
            if char.isalpha():
                base = ord('A') if char.isupper() else ord('a')
                decrypted += chr((ord(char) - base - self.shift) % 26 + base)
            else:
                decrypted += char
        return decrypted

    def __str__(self):
        return f"Title: {self.title}\nDate: {self.date}\nBody:\n{self.body}"


class NotesManager:
    def __init__(self, filename="notes.txt"):
        self.filename = filename
        self.notes = self.load_notes()

    def save_note(self, note):
        encrypted_body = note.encrypt()
        with open(self.filename, "a", encoding="utf-8") as f:
            f.write(f"{note.title}||{note.date}||{encrypted_body}\n")
        print(f"\n✅ Note '{note.title}' saved successfully!")

    def load_notes(self):
        notes = []
        if not os.path.exists(self.filename):
            return notes
        with open(self.filename, "r", encoding="utf-8") as f:
            for line in f:
                try:
                    title, date, encrypted_body = line.strip().split("||")
                    note = Note(title, "", shift=3)
                    note.body = note.decrypt(encrypted_body)
                    note.date = date
                    notes.append(note)
                except ValueError:
                    print("⚠️ Skipped a corrupted note entry.")
        return notes

    def list_notes(self):
        if not self.notes:
            print("\n📭 No notes found.")
            return
        for i, note in enumerate(self.notes, 1):
            print(f"{i}. {note.title} ({note.date})")

    def read_note(self, index):
        try:
            note = self.notes[index - 1]
            print("\n🔓 Decrypted Note:")
            print(note)
        except IndexError:
            print("❌ Invalid note index.")

    def delete_note(self, index):
        try:
            deleted = self.notes.pop(index - 1)
            self._overwrite_file()
            print(f"\n🗑️ Deleted note: {deleted.title}")
        except IndexError:
            print("❌ Invalid note index.")

    def _overwrite_file(self):
        with open(self.filename, "w", encoding="utf-8") as f:
            for note in self.notes:
                encrypted_body = note.encrypt()
                f.write(f"{note.title}||{note.date}||{encrypted_body}\n")


def menu():
    manager = NotesManager()
    while True:
        print("\n=== 📝 Secure Notes Manager ===")
        print("1. Add Note")
        print("2. View All Notes")
        print("3. Read a Note")
        print("4. Delete a Note")
        print("5. Exit")

        choice = input("Enter your choice (1–5): ")

        if choice == "1":
            title = input("\nEnter note title: ")
            body = input("Enter note body: ")
            note = Note(title, body)
            manager.save_note(note)

        elif choice == "2":
            print("\n📚 Listing All Notes:")
            manager.list_notes()

        elif choice == "3":
            manager.list_notes()
            try:
                index = int(input("Enter note number to read: "))
                manager.read_note(index)
            except ValueError:
                print("❌ Please enter a valid number.")

        elif choice == "4":
            manager.list_notes()
            try:
                index = int(input("Enter note number to delete: "))
                manager.delete_note(index)
            except ValueError:
                print("❌ Please enter a valid number.")

        elif choice == "5":
            print("👋 Exiting Secure Notes Manager. God bless you!")
            break
        else:
            print("❌ Invalid input. Please choose from 1 to 5.")


if __name__ == "__main__":
    menu()
