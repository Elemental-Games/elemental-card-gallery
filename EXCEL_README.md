# Excel Spreadsheet Guide for Elemental Masters

This guide explains how to structure your Excel spreadsheet for the Elemental Masters card game data.

## Spreadsheet Structure

Your spreadsheet should have the following columns:

- cardNumber
- id
- name
- element
- type
- rune
- tier
- rarity
- description
- strength
- agility
- abilityName
- ability
- specialAbilityName
- specialAbility
- specialAbilityCost
- essenceCost
- essenceGeneration
- trigger
- quote
- synergies
- counters
- news

## Column Descriptions

- cardNumber: The unique number assigned to each card
- rune: The type of rune card (normal, instant, or equipment)
- tier: The tier of the shield (1, 2, or 3)
- trigger: The trigger condition for counter cards (only applicable for cards of type 'Counter')

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

| cardNumber | id | name | element | type | rune | tier | rarity | description | strength | agility | abilityName | ability | specialAbilityName | specialAbility | specialAbilityCost | essenceCost | essenceGeneration | trigger | quote | synergies | counters | news |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 001 | water-elemental | Water Elemental | Water | Creature | normal | 1 | Rare | A creature made of the element of water. | 7 | 5 | Tidal Wave | Deal 3 damage to all enemy creatures. | Hydro Pump | Once per game, deal 10 damage to a single target. | 4 | 4 | 2 | | "The ocean's might flows through me." | [{"card":{"id":"leaf-spirit","name":"Leaf Spirit"},"rating":"S","color":"text-green-500"},{"card":{"id":"flame-wisp","name":"Flame Wisp"},"rating":"A","color":"text-red-500"}] | [{"card":{"id":"wind-rider","name":"Wind Rider"},"rating":"S","color":"text-blue-300"}] | [{"title":"Water Elemental Showcase","date":"2023-05-01","description":"Check out our latest video showcasing the Water Elemental in action!","link":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}] |

Remember to input all JSON data as a single line of text in each cell, without line breaks.