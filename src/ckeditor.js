/**
 * @license Copyright (c) 2014-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CKBox from '@ckeditor/ckeditor5-ckbox/src/ckbox.js';
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
// import List from '@ckeditor/ckeditor5-list/src/list.js';
import DocumentList from '@ckeditor/ckeditor5-list/src/documentlist.js';
import AdjacentListsSupport from '@ckeditor/ckeditor5-list/src/documentlist/adjacentlistssupport.js';
import ListProperties from '@ckeditor/ckeditor5-list/src/listproperties.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import PictureEditing from '@ckeditor/ckeditor5-image/src/pictureediting.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';
// import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript.js';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript.js';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code.js';
import CodeBlock from '@ckeditor/ckeditor5-code-block/src/codeblock.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';

import Plugin from '@ckeditor/ckeditor5-core/src/plugin.js';
import { ButtonView } from '@ckeditor/ckeditor5-ui';
import linkToPageIcon from './icons/link-to-page.svg';
import imageIcon from '@ckeditor/ckeditor5-core/theme/icons/image.svg';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';

// class Editor extends DecoupledDocumentEditor {}
class Editor extends ClassicEditorBase {}

/* global WIKI */

class LinkToPage extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'linkToPage', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: '插入文章',
				icon: linkToPageIcon,
				tooltip: true
			} );

			view.on( 'execute', () => {
				WIKI.$emit( 'editorLinkToPage' );
			} );

			return view;
		} );
	}
}

class InsertAsset extends Plugin {
	init() {
		const editor = this.editor;

		editor.ui.componentFactory.add( 'insertAsset', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: '插入图片',
				icon: imageIcon,
				tooltip: true
			} );

			view.on( 'execute', () => {
				WIKI.$store.set( 'editor/activeModal', 'editorModalMedia' );
			} );

			return view;
		} );
	}
}

// Plugins to include in the build.
Editor.builtinPlugins = [
	Alignment,
	Autoformat,
	BlockQuote,
	Code,
	CodeBlock,
	Bold,
	CKBox,
	CloudServices,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	Image,
	ImageCaption,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	InsertAsset,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkToPage,
	DocumentList,
	AdjacentListsSupport,
	// List,
	// ListProperties,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	GeneralHtmlSupport,
	PictureEditing,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableCellProperties,
	TableProperties,
	TableToolbar,
	TextTransformation,
	// TodoList,
	Underline
];

// Editor configuration.
Editor.defaultConfig = {
	toolbar: {
		items: [
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'fontColor',
			'fontBackgroundColor',
			'highlight',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'subscript',
			'superscript',
			'|',
			'alignment',
			'|',
			'numberedList',
			'bulletedList',
			'indentList',
			'|',
			'outdent',
			'indent',
			'|',
			// 'todoList',
			'link',
			'linkToPage',
			'insertAsset',
			'insertTable',
			'code',
			'codeBlock',
			'|',
			'undo',
			'redo',
		]
	},
	language: 'zh-cn',
	image: {
		toolbar: [
			'imageTextAlternative',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties'
		]
	}
};

export default Editor;
