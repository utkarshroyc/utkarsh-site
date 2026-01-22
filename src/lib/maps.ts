export interface MapItem {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  techniques: string[];
  project?: string;
  aspectRatio: "landscape" | "portrait" | "square";
}

export const maps: MapItem[] = [
  {
    id: "ganga-basin-overview",
    title: "Ganga River Basin Overview",
    description: "Comprehensive map showing the Ganga River basin extent, major tributaries, and key urban centers.",
    category: "Reference Map",
    year: "2024",
    techniques: ["QGIS", "Natural Earth Data", "HydroSHEDS"],
    project: "The Unfinished River",
    aspectRatio: "landscape",
  },
  {
    id: "dolphin-habitat",
    title: "Gangetic Dolphin Habitat Distribution",
    description: "Spatial analysis of Gangetic dolphin sighting locations and habitat suitability across the river system.",
    category: "Species Distribution",
    year: "2024",
    techniques: ["MaxEnt", "QGIS", "Remote Sensing"],
    project: "The Unfinished River",
    aspectRatio: "landscape",
  },
  {
    id: "restoration-sites",
    title: "Namami Gange Restoration Sites",
    description: "Locations of major restoration interventions under the Namami Gange programme with project status.",
    category: "Infrastructure Map",
    year: "2023",
    techniques: ["QGIS", "Government Data", "Field Verification"],
    project: "The Unfinished River",
    aspectRatio: "portrait",
  },
  {
    id: "water-quality",
    title: "Water Quality Monitoring Stations",
    description: "Network of CPCB water quality monitoring stations along the Ganga with pollution levels.",
    category: "Environmental Data",
    year: "2023",
    techniques: ["QGIS", "CPCB Data", "Interpolation"],
    project: "The Unfinished River",
    aspectRatio: "landscape",
  },
  {
    id: "land-use-change",
    title: "Riparian Land Use Change 2000-2020",
    description: "Multi-temporal analysis of land use changes in the Ganga floodplain over two decades.",
    category: "Change Detection",
    year: "2023",
    techniques: ["Google Earth Engine", "Landsat", "Classification"],
    project: "GAGES",
    aspectRatio: "landscape",
  },
  {
    id: "ecosystem-services",
    title: "Ecosystem Services Provision",
    description: "Mapping of key ecosystem services across the Ganga basin including water provisioning and flood regulation.",
    category: "Ecosystem Services",
    year: "2023",
    techniques: ["InVEST", "QGIS", "Remote Sensing"],
    project: "GAGES",
    aspectRatio: "square",
  },
  {
    id: "fieldwork-sites",
    title: "Ethnographic Fieldwork Sites",
    description: "Locations of primary fieldwork sites for dissertation research across Uttar Pradesh and Bihar.",
    category: "Research Map",
    year: "2024",
    techniques: ["QGIS", "GPS Data", "OpenStreetMap"],
    project: "The Unfinished River",
    aspectRatio: "portrait",
  },
  {
    id: "wildlife-conflict",
    title: "Human-Wildlife Conflict Hotspots",
    description: "Spatial clustering analysis of reported human-wildlife conflict incidents across study regions.",
    category: "Conflict Analysis",
    year: "2024",
    techniques: ["QGIS", "Kernel Density", "Government Records"],
    project: "Seeing Animals Like a State",
    aspectRatio: "landscape",
  },
];

export function getMapById(id: string): MapItem | undefined {
  return maps.find(m => m.id === id);
}
