import BetterFeed from "./BetterFeed";
import useAssetFeed from "../../hooks/useAssetFeed";

export default function AssetFeedContainer() {
    const assetFeed = useAssetFeed();

    return (
        <BetterFeed feed={assetFeed}/>
    )
}