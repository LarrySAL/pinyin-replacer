import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class PinyinReplacer extends Plugin{

	async onload(){
		console.log('loading in pinyin replacer');
		
		const sBItem = this.addStatusBarItem().createEl("span");
		sBItem.createEl("span", {text: "ā á ǎ à"});

		this.addCommand({
			id: "replace-first-tone",
			name: "Replace first tone",
			hotkeys: [{modifiers: ["Alt"], key: "1"}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const lastChar = this.getCharacterBeforeCursor(editor);
				const vowelIndex = this.vowelToNumber(lastChar);

				if(vowelIndex !== -1){
					const pinyingTone = this.findPinYingTone(0, vowelIndex);
					const cursorPos = editor.getCursor()
					if(cursorPos.ch){
						editor.replaceRange(pinyingTone, {line: cursorPos.line, ch: cursorPos.ch-1}, cursorPos);
					}else{
						editor.replaceRange(pinyingTone, cursorPos, {line: cursorPos.line, ch: cursorPos.ch+1});
					}
				}
			}
		});

		this.addCommand({
			id: "replace-second-tone",
			name: "Replace second tone",
			hotkeys: [{modifiers: ["Alt"], key: "2"}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const lastChar = this.getCharacterBeforeCursor(editor);
				const vowelIndex = this.vowelToNumber(lastChar);

				if(vowelIndex !== -1){
					const pinyingTone = this.findPinYingTone(1, vowelIndex);
					const cursorPos = editor.getCursor()
					if(cursorPos.ch){
						editor.replaceRange(pinyingTone, {line: cursorPos.line, ch: cursorPos.ch-1}, cursorPos);
					}else{
						editor.replaceRange(pinyingTone, cursorPos, {line: cursorPos.line, ch: cursorPos.ch+1});
					}
				}
			}
		});

		this.addCommand({
			id: "replace-third-tone",
			name: "Replace third tone",
			hotkeys: [{modifiers: ["Alt"], key: "3"}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const lastChar = this.getCharacterBeforeCursor(editor);
				const vowelIndex = this.vowelToNumber(lastChar);

				if(vowelIndex !== -1){
					const pinyingTone = this.findPinYingTone(2, vowelIndex);
					const cursorPos = editor.getCursor()
					if(cursorPos.ch){
						editor.replaceRange(pinyingTone, {line: cursorPos.line, ch: cursorPos.ch-1}, cursorPos);
					}else{
						editor.replaceRange(pinyingTone, cursorPos, {line: cursorPos.line, ch: cursorPos.ch+1});
					}
				}
			}
		});

		this.addCommand({
			id: "replace-fourth-tone",
			name: "Replace fourth tone",
			hotkeys: [{modifiers: ["Alt"], key: "4"}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const lastChar = this.getCharacterBeforeCursor(editor);
				const vowelIndex = this.vowelToNumber(lastChar);

				if(vowelIndex !== -1){
					const pinyingTone = this.findPinYingTone(3, vowelIndex);
					const cursorPos = editor.getCursor()
					if(cursorPos.ch){
						editor.replaceRange(pinyingTone, {line: cursorPos.line, ch: cursorPos.ch-1}, cursorPos);
					}else{
						editor.replaceRange(pinyingTone, cursorPos, {line: cursorPos.line, ch: cursorPos.ch+1});
					}
				}
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
	
	private vowelToNumber(vowel: string){
		const vowels = ['a', 'e' , 'i', 'o', 'u', 'v'];
		const index = vowels.indexOf(vowel.toLowerCase());
		return index;
	}

	private findPinYingTone(tone: number, vowelIndex: number){
		const tones = [["ā", "á", "ǎ", "à"],
						["ē", "é", "ě", "è"],
						["ī", "í", "ǐ", "ì"],
						["ō", "ó", "ǒ", "ò"],
						["ū", "ú", "ǔ", "ù"],
						["ǖ", "ǘ", "ǚ", "ǜ"]];

		return tones[vowelIndex][tone];
	}
	
}