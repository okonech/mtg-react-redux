import React from 'react';
import Card from '../../components/Card/Card';
import BattleField from '../BattleField';
import Hand from '../Hand/Hand';
import InfoArea from '../InfoArea';

const PlayerStyle = {
    height: '90%',
    width: '100%',
};

const InfoAreaStyle: any  = {
    height: '100%',
    width: '15%',
    float: 'left',
    'backgroundColor': '#111',
};

const HandStyle: any = {
    float: 'bottom',
    height: '15%',
    marginLeft: '20%',
    width: '60%'
};

const BattleFieldStyle = {
    height: '85%',
    width: '100%'
};

const ActiveAreaStyle = {
    height: '100%',
    marginLeft: '15%', /* Same as the width of the sidebar */
    width: '85%'
};

const cards = [
    'Lotus Petal',
    'Mana Crypt',
    'Nihil Spellbomb',
    'Orzhov Signet',
    "Sensei's Divining Top",
    'Candelabra of Tawnos',
    'Sol Ring',
    "Lion's Eye Diamond",
    'Mox Opal',
    'Mox Diamond',
    'Mana Vault',
    'Chrome Mox',
    'Talisman of Dominance',
    'Scroll Rack',
    'Azorius Signet',
    'Talisman of Progress',
    'Fellwar Stone',
    'Grim Monolith',
    'Helm of Awakening',
    'Dimir Signet',
    'Isochron Scepter',
    'Aetherflux Reservoir',
    'Laboratory Maniac',
    'Shimmer Myr',
    'Zur the Enchanter',
    'Notion Thief',
    "Jace, Vryn's Prodigy",
    'Mystic Remora',
    'Grasp of Fate',
    'Necropotence',
    'High Tide',
    'Mana Drain',
    'Counterspell',
    'Mystical Tutor',
    'Vampiric Tutor',
    'Dark Ritual',
    'Frantic Search',
    'Gush',
    'Force of Will',
    'Pact of Negation',
    'Mental Misstep',
    'Swan Song',
    'Spell Pierce',
    'Quicken',
    'Negate',
    'Ad Nauseam',
    'Swords to Plowshares',
    'Cabal Ritual',
    'Silence',
    'Enlightened Tutor',
    "Hurkyl's Recall",
    "Angel's Grace",
    'Brainstorm',
    'Chain of Vapor',
    'Flusterstorm',
    'Impulse',
    'Delay',
    'Dramatic Reversal',
    "Lim-Dûl's Vault",
    'Cyclonic Rift',
    'Underground Sea',
    'Polluted Delta',
    'Ancient Tomb',
    'Windswept Heath',
    'Watery Grave',
    'Verdant Catacombs',
    'Flooded Strand',
    'Tundra',
    'Swamp',
    'Scrubland',
    'Scalding Tarn',
    'Marsh Flats',
    'Mana Confluence',
    'Island',
    'Island',
    'Island',
    'Island',
    'Island',
    'Island',
    'Island',
    'Island',
    'Hallowed Fountain',
    'Arid Mesa',
    'Misty Rainforest',
    'Command Tower',
    'City of Brass',
    'Bloodstained Mire',
    'Godless Shrine',
    'Gemstone Caverns',
    'Imperial Seal',
    "Yawgmoth's Will",
    'Toxic Deluge',
    'Windfall',
    'Timetwister',
    'Doomsday',
    'Ponder',
    'Gitaxian Probe',
    'Preordain',
    'Demonic Tutor',
    'Merchant Scroll'
];

export default class Player extends React.Component {
    public cards: [Card];

    constructor(props: any) {
        super(props);
        // assign cards here
      }

    public render() {
        return (
            <div style={PlayerStyle}>
                <div style={InfoAreaStyle}>
                    <InfoArea />
                </div>
                <div style={ActiveAreaStyle}>
                    <div style={BattleFieldStyle}>
                        <BattleField />
                    </div>
                    <div style={HandStyle}>
                        <Hand cards = {this.cards}/>
                    </div>

                </div>



            </div>
        );
      }
}