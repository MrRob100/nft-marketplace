export type Trait = "attack" | "health" | "speed";

export type NftAttribute = {
    trait_type: "attack" | "health" | "speed";
    value: string;
}

export type NftMeta = {
    name: string;
    description: string;
    image: string;
    attributes: NftAttribute[];
}