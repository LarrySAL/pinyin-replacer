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

				if(vowelIndex !== undefined){
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

				if(vowelIndex !== undefined){
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

				if(vowelIndex !== undefined){
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

				if(vowelIndex !== undefined){
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

		this.addCommand({
			id: "remove-tone",
			name: "Remove tone",
			hotkeys: [{modifiers: ["Alt"], key: "r"}],
			editorCallback: (editor: Editor, view: MarkdownView) => {
				const lastChar = this.getCharacterBeforeCursor(editor);
				const vowelIndex = this.vowelToNumber(lastChar);

				if(vowelIndex !== undefined){
					const pinyingTone = this.findPinYingTone(4, vowelIndex);
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
		const vowels = [
			['a', 'ā', 'á', 'ǎ', 'à'],
			['e', 'ē', 'é', 'ě', 'è'] , 
			['i', 'ī', 'í', 'ǐ', 'ì'], 
			['o', 'ō', 'ó', 'ǒ', 'ò'], 
			['u', 'ū', 'ú', 'ǔ', 'ù']
		];
		for(let i = 0; i < vowels.length; i++){
			if(vowels[i].includes(vowel.toLowerCase())){
				return i;
			}
		}
	}

	private findPinYingTone(tone: number, vowelIndex: number){
		const tones = [["ā", "á", "ǎ", "à", "a"],
						["ē", "é", "ě", "è", "e"],
						["ī", "í", "ǐ", "ì", "i"],
						["ō", "ó", "ǒ", "ò", "o"],
						["ū", "ú", "ǔ", "ù", "u"]];

		return tones[vowelIndex][tone];
	}
	
}