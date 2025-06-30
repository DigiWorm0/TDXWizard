import BulkInventoryButton from "../buttons/BulkInventoryButton";

export interface InventoryNavBarProps {
    appID: number;
}

export default function InventoryNavBar(props: InventoryNavBarProps) {
    return (
        <div className={"wizard_inventory"}>
            <BulkInventoryButton appID={props.appID}/>
            {/*<SurplusManagerButton/>*/}
        </div>
    )
}