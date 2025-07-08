import SidebarImage from "../../content/SidebarBG_compressed.jpg";

export default function SettingsSidebarImage() {
    return (
        <div>
            <img
                alt={"Sidebar"}
                src={SidebarImage}
                width={230}
                style={{
                    borderTopLeftRadius: "1.125rem",
                    borderBottomLeftRadius: "1.125rem",
                    height: "100%",
                    objectFit: "cover",
                    marginRight: 5,
                }}
            />
            <span
                aria-hidden={true}
                className={"fa fa-hat-wizard wizard_float"}
                style={{
                    position: "absolute",
                    top: 115,
                    left: -25,
                    fontSize: 220,
                    filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))",
                    color: "#fff",
                }}
            />
        </div>
    );
}