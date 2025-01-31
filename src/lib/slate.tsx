import React, { useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';

const TextArea = ({ currentText }: { currentText?: string | '' | null }) => {
  const [editor] = useState(() => withReact(createEditor()));
  const [sendText, setSendText] = useState(currentText || '');

  const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: currentText ? currentText : '' }],
    },
  ];

  return (
    <div>
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => 'set_selection' !== op.type,
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            value.forEach((node) => {
              if ('children' in node) {
                node.children.forEach((child) => {
                  if ('text' in child) {
                    if (child.text.length > sendText.length) {
                      setSendText(sendText + child.text);
                    } else {
                      setSendText(child.text);
                    }
                  }
                });
              }
            });
            sessionStorage.setItem('SlateText', sendText);
          }
        }}>
        <Editable
          onKeyDown={(event) => {
            if (event.key === '&') {
              event.preventDefault();
              editor.insertText('and');
            }
          }}
          placeholder="상세 리뷰를 입력해 주세요."
          style={{
            border: '1px solid #000',
            padding: '10px',
            minHeight: '100px',
            color: '#000',
          }}
        />
      </Slate>
    </div>
  );
};

export default TextArea;
