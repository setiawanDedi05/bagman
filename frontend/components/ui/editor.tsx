import {
  BtnBold,
  BtnItalic,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Toolbar,
  BtnUnderline,
  BtnLink,
  BtnBulletList,
  BtnNumberedList,
} from "react-simple-wysiwyg";

interface CustomEditorProps {
  value?: string;
  onChange?: ((event: ContentEditableEvent) => void) | undefined;
  height?: string;
  width?: string;
}

export default function CustomEditor({ value, onChange, height, width }: CustomEditorProps) {
  return (
    <EditorProvider>
      <Editor
        containerProps={{
          style: {
            height: height ||"200px",
            width: width || "100%"
          },
        }}
        value={value}
        onChange={onChange}
      >
        <Toolbar>
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnLink />
          <BtnBulletList />
          <BtnNumberedList />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}
