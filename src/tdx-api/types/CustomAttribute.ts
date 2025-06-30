import CustomAttributeChoice from "./CustomAttributeChoice";

export default interface CustomAttribute {
    ID: number;
    Name?: string;
    Order?: number;
    Description?: string;
    SectionID?: number;
    SectionName?: string;
    FieldType?: string;
    DataType?: string;
    Choices?: CustomAttributeChoice[];
    IsRequired?: boolean;
    IsUpdatable?: boolean;
    Value?: string;
    ValueText?: string;
    ChoicesText?: string;
    AssociatedItemIDs?: number[];
}