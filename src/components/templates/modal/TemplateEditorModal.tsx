import ModalBase from "../../common/ModalBase";
import useTemplateEditorOpen from "../../../hooks/templates/useTemplateEditorOpen";
import NoTemplateSelectedOverlay from "./NoTemplateSelectedOverlay";
import TemplateEditorTree from "./TemplateEditorTree";
import useSelectedTemplateID from "../../../hooks/templates/useSelectedTemplateID";
import TemplateEditorPanel from "./TemplateEditorPanel";
import CreateTemplateButton from "./CreateTemplateButton";
import TDXButtonGroup from "../../common/TDXButtonGroup";

export default function TemplateEditorModal() {
    const [isOpen, setIsOpen] = useTemplateEditorOpen();
    const [selectedID, setSelectedID] = useSelectedTemplateID();

    return (
        <ModalBase
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
        >
            <div
                className={"modal-dialog"}
                role={"document"}
                style={{minWidth: 1000}}
            >
                <div
                    className={"modal-content h-100"}
                    style={{minHeight: 600}}
                >
                    <div className={"row"}>
                        <div className={"col-sm-4"}>
                            <h3
                                style={{
                                    fontFamily: "\"DM Sans\",sans-serif",
                                    fontWeight: "bold",
                                    fontSize: 30,
                                    marginTop: 10,
                                    marginBottom: 18
                                }}
                            >
                                My Templates
                            </h3>
                            <TemplateEditorTree
                                onSelectTemplate={setSelectedID}
                                selectedTemplateID={selectedID}
                            />
                            <TDXButtonGroup>
                                <CreateTemplateButton/>
                            </TDXButtonGroup>
                        </div>
                        <div className={"col-sm-8"}>
                            {selectedID === null && <NoTemplateSelectedOverlay/>}
                            {selectedID !== null && <TemplateEditorPanel/>}
                        </div>
                    </div>
                </div>
            </div>
        </ModalBase>
    );
}