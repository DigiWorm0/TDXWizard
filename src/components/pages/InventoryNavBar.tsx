import BulkInventoryButton from "../buttons/BulkInventoryButton";
import SurplusManagerButton from "../buttons/SurplusManagerButton";

export interface InventoryNavBarProps {
    appID: number;
}

export default function InventoryNavBar(props: InventoryNavBarProps) {
    return (
        <div className={"wizard_inventory"}>
            <BulkInventoryButton appID={props.appID}/>
            <SurplusManagerButton/>
        </div>
    )
}