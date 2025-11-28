import { Editor, Plugin } from 'obsidian';

export default class PinyinReplacer extends Plugin{

	async onload(){
		console.log('loading in pinyin replacer');
		
		const sBItem = this.addStatusBarItem().createEl("span");
		sBItem.createEl("span", {text: "ā á ǎ à"});

		this.addCommand({
			id: "remove-tone",
			name: "Remove tone",
			hotkeys: [{modifiers: ["Alt"], key: "r"}],
			editorCallback: (editor: Editor) => {
				this.replaceTone(0, editor);
			}
		});
		
		this.addCommand({
			id: "replace-first-tone",
			name: "Replace first tone",
			hotkeys: [{modifiers: ["Alt"], key: "1"}],
			editorCallback: (editor: Editor) => {
				this.replaceTone(1, editor);
			}
		});

		this.addCommand({
			id: "replace-second-tone",
			name: "Replace second tone",
			hotkeys: [{modifiers: ["Alt"], key: "2"}],
			editorCallback: (editor: Editor) => {
				this.replaceTone(2, editor);
			}
		});

		this.addCommand({
			id: "replace-third-tone",
			name: "Replace third tone",
			hotkeys: [{modifiers: ["Alt"], key: "3"}],
			editorCallback: (editor: Editor) => {
				this.replaceTone(3, editor);
			}
		});

		this.addCommand({
			id: "replace-fourth-tone",
			name: "Replace fourth tone",
			hotkeys: [{modifiers: ["Alt"], key: "4"}],
			editorCallback: (editor: Editor) => {
				this.replaceTone(4, editor);
			}
		});

	}

	async onunload(){
		console.log('unloading in pinyin replacer');

	}

	private getCharacterBeforeCursor(editor: Editor){
		const lines = editor.getValue().split(/\r\n|\n|\r/);
		const cursor = editor.getCursor();
		let lastChar;
		if(cursor.ch > 0){
			lastChar = lines[cursor.line][cursor.ch-1];
		}else{
			lastChar = lines[cursor.line][cursor.ch];
		}
		return lastChar;
	}
	
	private replaceTone(tone: number, editor: Editor){
		const lastChar = this.getCharacterBeforeCursor(editor);
		const vowelIndex = this.withVowels((vowels) => vowels.findIndex(row => row.includes(lastChar.toLowerCase())));

		if(vowelIndex !== undefined){
			const pinyingTone = this.withVowels(vowels => vowels[vowelIndex][tone]);
			const cursorPos = editor.getCursor()
			if(cursorPos.ch){
				editor.replaceRange(pinyingTone, {line: cursorPos.line, ch: cursorPos.ch-1}, cursorPos);
			}else{
				editor.replaceRange(pinyingTone, cursorPos, {line: cursorPos.line, ch: cursorPos.ch+1});
			}	
		}
	}

	private withVowels<T>(op: (v: string[][]) => T): T {
		return op(this.vowelMatrix);
	}

	private readonly vowelMatrix  = [
		['a', 'ā', 'á', 'ǎ', 'à'],
		['e', 'ē', 'é', 'ě', 'è'] , 
		['i', 'ī', 'í', 'ǐ', 'ì'], 
		['o', 'ō', 'ó', 'ǒ', 'ò'], 
		['u', 'ū', 'ú', 'ǔ', 'ù'],
	];

}