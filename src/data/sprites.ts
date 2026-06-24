import spritePositions from '../assets/jimcity_sprite_positions.json'
import type { ProjectId } from './projects'

import busSprite from '../assets/Sprites/retro_pixel_art_city_bus.png'
import busStationSprite from '../assets/Sprites/pixel_art_bus_station_shelter.png'
import businessSprite from '../assets/Sprites/pixel_art_storefront_row_with_cafes.png'
import collapsedRoadSprite from '../assets/Sprites/collapsed_road_with_warning_sign.png'
import errorBuildingSprite from '../assets/Sprites/pixelated_fortress_with_error_sign.png'
import hospitalSprite from '../assets/Sprites/retro_hospital_with_pixel_characters.png'
import policeSprite from '../assets/Sprites/pixel_art_police_station_building.png'
import potholesSprite from '../assets/Sprites/damaged_crater_with_rubble_patch.png'
import spriteMap from '../assets/Sprites/SpriteMap.png'

export { spriteMap }

export const MAP_WIDTH = spritePositions.map_width
export const MAP_HEIGHT = spritePositions.map_height

export interface SpriteEntry {
  spriteName: string
  displayLabel: string
  x: number
  y: number
  image: string
  /** When set, this sprite lights up when the project is funded. */
  projectId?: ProjectId
  /** Shown only in the Option 4D bad ending. */
  badEndingOnly?: boolean
  /** Label shown on the map (defaults to displayLabel). */
  mapLabel?: string
  /** Compact sizing for road-level markers. */
  size?: 'road'
  /** Override the default label position relative to the sprite image. */
  labelPosition?: 'above' | 'below-close'
}

const SPRITE_OVERRIDES: Partial<
  Record<
    string,
    Pick<SpriteEntry, 'mapLabel' | 'x' | 'y' | 'size' | 'labelPosition'>
  >
> = {
  collapsed_road_with_warning_sign: {
    labelPosition: 'below-close',
  },
  damaged_crater_with_rubble_patch: {
    mapLabel: 'Pothole',
    x: 528,
    y: 600,
    size: 'road',
    labelPosition: 'above',
  },
  pixel_art_police_station_building: {
    labelPosition: 'above',
  },
}

const SPRITE_IMAGES: Record<string, string> = {
  collapsed_road_with_warning_sign: collapsedRoadSprite,
  pixelated_fortress_with_error_sign: errorBuildingSprite,
  pixel_art_storefront_row_with_cafes: businessSprite,
  damaged_crater_with_rubble_patch: potholesSprite,
  retro_hospital_with_pixel_characters: hospitalSprite,
  pixel_art_police_station_building: policeSprite,
  pixel_art_bus_station_shelter: busStationSprite,
  retro_pixel_art_city_bus: busSprite,
}

const PROJECT_BY_SPRITE: Partial<Record<string, ProjectId>> = {
  retro_hospital_with_pixel_characters: 'healthcare',
  pixel_art_bus_station_shelter: 'buses',
  retro_pixel_art_city_bus: 'buses',
  pixel_art_police_station_building: 'police',
  pixel_art_storefront_row_with_cafes: 'business',
  damaged_crater_with_rubble_patch: 'potholes',
  collapsed_road_with_warning_sign: 'galleyHill',
}

export const SPRITES: SpriteEntry[] = spritePositions.sprites.map((entry) => {
  const override = SPRITE_OVERRIDES[entry.sprite_name]
  return {
    spriteName: entry.sprite_name,
    displayLabel: entry.display_label,
    x: override?.x ?? entry.x,
    y: override?.y ?? entry.y,
    image: SPRITE_IMAGES[entry.sprite_name],
    projectId: PROJECT_BY_SPRITE[entry.sprite_name],
    badEndingOnly: entry.sprite_name === 'pixelated_fortress_with_error_sign',
    mapLabel: override?.mapLabel,
    size: override?.size,
    labelPosition: override?.labelPosition,
  }
})

export const SPRITE_BY_PROJECT = new Map<ProjectId, SpriteEntry>(
  SPRITES.filter((s) => s.projectId).map((s) => [s.projectId!, s]),
)
