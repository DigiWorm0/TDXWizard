export interface InventoryNavBarProps {
    appID: number;
}

export default function InventoryNavBar(_props: InventoryNavBarProps) {
    return (
        <div className={"wizard_inventory"}>
            {/*<BulkInventoryButton appID={props.appID}/>*/}
            {/*<SurplusManagerButton/>*/}
        </div>
    )
}