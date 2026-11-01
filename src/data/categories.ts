import { DestinationCategory } from "@/types";

export interface CategoryInfo {
  id: string;
  name: DestinationCategory;
  slug: string;
  shortDescription: string;
  iconName: string;
  image: string;
  accentColor: string;
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: "cat-heritage",
    name: "Heritage and monuments",
    slug: "heritage-and-monuments",
    shortDescription: "Centuries of architectural brilliance from Vijayanagara to Badami Chalukyas.",
    iconName: "Landmark",
    image: "https://images.unsplash.com/photo-1600100397608-f010f443b350?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-amber-600 to-orange-700",
  },
  {
    id: "cat-nature",
    name: "Nature and waterfalls",
    slug: "nature-and-waterfalls",
    shortDescription: "Gushing cascades, UNESCO Western Ghats biodiversity, and pristine riverbanks.",
    iconName: "Trees",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-emerald-600 to-teal-800",
  },
  {
    id: "cat-hills",
    name: "Hill stations",
    slug: "hill-stations",
    shortDescription: "Misty peaks, coffee plantations, and cool mountain breezes across the Malnad belt.",
    iconName: "Mountain",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-teal-600 to-cyan-800",
  },
  {
    id: "cat-beaches",
    name: "Beaches and coastal escapes",
    slug: "beaches-and-coastal-escapes",
    shortDescription: "Untouched Arabian sea coastlines, golden sands, and cliff-top temple views.",
    iconName: "Waves",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-cyan-600 to-blue-700",
  },
  {
    id: "cat-temples",
    name: "Temples and cultural heritage",
    slug: "temples-and-cultural-heritage",
    shortDescription: "Ancient stone-carved shrines, sacred river confluences, and vibrant temple traditions.",
    iconName: "Sparkles",
    image: "https://images.unsplash.com/photo-1627993078456-91e779a5ea5f?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-orange-600 to-amber-700",
  },
  {
    id: "cat-adventure",
    name: "Adventure and outdoor activities",
    slug: "adventure-and-outdoor-activities",
    shortDescription: "Trekking through Shola grasslands, boulder climbing, kayaking, and camping.",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-rose-600 to-orange-600",
  },
  {
    id: "cat-food",
    name: "Local food and crafts",
    slug: "local-food-and-crafts",
    shortDescription: "Authentic coastal seafood, Channapatna wooden toys, and aromatic filter kaapi.",
    iconName: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-amber-500 to-red-600",
  },
  {
    id: "cat-family",
    name: "Family-friendly destinations",
    slug: "family-friendly-destinations",
    shortDescription: "Royal palaces, gentle boat rides, botanical reserves, and comfortable homestays.",
    iconName: "Users",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    accentColor: "from-emerald-500 to-teal-700",
  },
];
