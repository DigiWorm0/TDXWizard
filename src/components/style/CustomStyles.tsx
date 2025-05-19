import useCustomStyle from "../../hooks/useCustomStyle";

export default function CustomStyles() {
    useCustomStyle("denseStyle", "wizard_dense");
    useCustomStyle("stripedTableRows", "wizard_striped-table-rows");

    return (
        <div/>
    )
}