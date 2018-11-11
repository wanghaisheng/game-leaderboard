import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import SearchBar from '../../../shared/components/SearchBar'

class PageRanking extends React.Component {
    constructor() {
        super()
        this.state = { 
            rating: [ ],
            members: [ ]
        };
        this.loadRating = this.loadRating.bind(this)
        this.loadMembers = this.loadMembers.bind(this)
    }

    componentDidMount() {
        this.loadRating()
        this.loadMembers()
    }

    loadRating() {
        axios.get('http://localhost:3001/data/rating')
            .then(response => {
                if (response.status === 200) 
                    return this.setState({ rating: response.data })
            }).catch(err => console.trace(err))
    }

    loadMembers() {
        axios.get('http://localhost:3001/api/members')
            .then(response => {
                if (response.status === 200) 
                    return this.setState({ members: response.data })
            }).catch(err => console.trace(err))
    }

    render() {
        const { props } = this;
        const rating = this.state.rating;
        const ranking = this.state.members; //change names here

        return (
            <div className="flex-column">
                <div className='wrapper-description'>
                    <div className='page-description'>
                    <p>Ranking system utilizes the games' score system. Depending on the game's individual difficulty level, it is given one of { rating.length } possible marks:</p>
				        <ul>
                            {
                                rating.map(r => <li><i className={ r.link } /> - worth { r.score } pts - { r.desc } </li>)
                            }
				        </ul>
                    <p>Completing a game might mean earning its most demanding achievement, or getting the in-game 100%; but for the sake of simplicity the ranking system present here assumes that completing a game means earning 100% of its Steam achievements. You are awarded points depending on the completed game's difficulty level, which are later summarized and used to determine your placement on the ranking ladder.</p>
                    </div>
                    <SearchBar />
                </div>
                <ul className="ranking-list">
                    {
                        ranking.map((member, index) => 
                            member.name.toLowerCase().indexOf(props.state.searchMember.toLowerCase()) !== -1
                            ? 
                                <li 
                                    className="member flex-row"
                                    key={ `member-${member.id}` }
                                >
                                    <div className="member-position">{ index+1 }</div>
                                    <img className="member-avatar" src={ member.avatar } alt="avatar"/>
                                    <div className="member-info flex-row">
                                        <div className="member-status"></div>
                                        <div className="member-name">{ member.name }</div>
                                        <div className="member-ranking flex-row">
                                            { 
                                                rating.map(score => 
                                                    <div className="member-rating-score">
                                                        <i className={ score.link } style={{ paddingRight: "5px"}}/> 
                                                        { member.ranking[score.score] !== undefined
                                                            ? member.ranking[score.score]
                                                            : "NaN" }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </li>
                            : null
                        )
                    } 
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => ({ state })

export default connect(
    mapStateToProps
)( PageRanking ) 