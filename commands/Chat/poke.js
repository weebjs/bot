const { Embed } = require('guilded.js');


module.exports = {
    name: 'pokemon',
    category: 'fun',
    description: 'Searches for information about a Pokémon',
    run: async (client, message, args) => {
        const pokemonName = args[0]; // Retrieve the Pokémon name from the command arguments

        // Make a request to the PokeAPI to fetch information about the Pokémon
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(async (response) => {
                if (response.ok) {
                    const pokemonData = await response.json();

                    // Extract the relevant information from the API response
                    const name = pokemonData.name;
                    const spriteUrl = pokemonData.sprites.front_default;
                    const abilities = pokemonData.abilities.map((ability) => ability.ability.name).join(', ');
                    const types = pokemonData.types.map((type) => type.type.name).join(', ');
                    const stats = pokemonData.stats
                        .map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
                        .join('\n');

                    // Create an embed with the Pokémon information
                    const embed = new Embed()
                        .setTitle(`Information for \`${name}\``)
                        .setThumbnail(spriteUrl)
                        .addField('Abilities', abilities, true)
                        .addField('Types', types, true)
                        .addField('Base Stats', stats);

                    message.reply({ embeds: [embed], isSilent: true });
                } else {
                    const embed = new Embed()
                        .setTitle('Oh No!')
                        .setDescription('Sorry, I could not find information about that Pokémon. \n\n**Due to the PokeAPI, all Pokèmon names have to be lowercase. Please try again using a existing pokemon.**');

                    message.reply({ embeds: [embed], isSilent: true });
                }
            })
            .catch((error) => {
                console.error(error);
                const embed = new Embed()
                    .setTitle('Yikes!')
                    .setDescription('An error occurred while fetching Pokémon information. Please try again.');

                message.reply({ embeds: [embed], isSilent: true });
            });
    },
};