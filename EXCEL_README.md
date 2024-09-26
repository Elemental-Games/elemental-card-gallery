# Excel Spreadsheet Guide for Elemental Masters

This guide explains how to structure your Excel spreadsheet for the Elemental Masters card game data.

## Spreadsheet Structure

Your spreadsheet should have the following columns:

- id
- name
- element
- type
- rarity
- description
- strength
- agility
- ability
- specialAbility
- essenceCost
- essenceGeneration
- background
- synergies
- counters
- news

## JSON Formatted Columns

The 'synergies', 'counters', and 'news' columns require data in JSON format. Here's how to input this data:

### Synergies and Counters

Format: `[{"card":{"id":"card-id","name":"Card Name"},"rating":"Rating","color":"text-color-class"}]`

Example:
```
[{"card":{"id":"leaf-spirit","name":"Leaf Spirit"},"rating":"S","color":"text-green-500"},{"card":{"id":"flame-wisp","name":"Flame Wisp"},"rating":"A","color":"text-red-500"}]
```

### News

Format: `[{"title":"News Title","date":"YYYY-MM-DD","description":"News description","link":"https://example.com"}]`

Example:
```
[{"title":"Water Elemental Showcase","date":"2023-05-01","description":"Check out our latest video showcasing the Water Elemental in action!","link":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}]
```

## Example Row

Here's an example of how a complete row might look:

| id | name | element | type | rarity | description | strength | agility | ability | specialAbility | essenceCost | essenceGeneration | background | synergies | counters | news |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| water-elemental | Water Elemental | Water | Creature | Rare | A creature made of the element of water. | 7 | 5 | Tidal Wave: Deal 3 damage to all enemy creatures. | Hydro Pump: Once per game, deal 10 damage to a single target. | 4 | 2 | Water Elementals are ancient beings that embody the raw power of the seas. They are known for their fluid tactics and overwhelming force in battle. | [{"card":{"id":"leaf-spirit","name":"Leaf Spirit"},"rating":"S","color":"text-green-500"},{"card":{"id":"flame-wisp","name":"Flame Wisp"},"rating":"A","color":"text-red-500"}] | [{"card":{"id":"wind-rider","name":"Wind Rider"},"rating":"S","color":"text-blue-300"}] | [{"title":"Water Elemental Showcase","date":"2023-05-01","description":"Check out our latest video showcasing the Water Elemental in action!","link":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}] |

Remember to input all JSON data as a single line of text in each cell, without line breaks.