import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IdeaPanelAccordion from '../../../components/ideapanelaccordion/IdeaPanelAccordion';
import Pagination from '../../../components/pagination/Pagination';

import Styles from '../Idea.module.scss';

// import UserIcon from './../../../assets/icons/user-profile.svg';
import InputSelect from './../../../components/inputselect/InputSelect';

// const dummyIdea = {
//     ideaId: 'abc',
//     profile: { name: 'Mayank', photo: UserIcon },
//     heading: 'Consumable plastic for saving the environment',
//     likes: 50,
//     comments: 5,
//     details:
//         'This idea can be developed by biologists and has been in talks for some time now, you can share your insights over this. This idea can be developed by biologists and has been in talks for some time now, you can share your insights over this.',
// };

const IdeaPanel = () => {
    let navigate = useNavigate();
    const [sort, setSort] = useState('featured');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [ideas, setIdeas] = useState(null);
    const nPerPage = 10;

    useEffect(() => {
        axios
            .get('http://localhost:8050/ideas/count')
            .then(resp => {
                const ideaCount = parseInt(resp.data.count);
                setPageCount(ideaCount / nPerPage);
            })
            .catch(error => {
                console.log('Page count fetch error', error);
            });

        axios
            .get('http://localhost:8050/ideas', {
                params: {
                    page: pageNumber,
                    perPage: nPerPage,
                    sort: sort,
                },
            })
            .then(resp => {
                setIdeas(resp.data.ideas);
            })
            .catch(error => {
                console.log(error);
                console.log('Error in fetching ideas');
            });
    }, [sort, pageNumber]);

    return (
        <div className={Styles.pageColumn}>
            <div className={Styles.toolsPanel}>
                <InputSelect
                    options={['Featured', 'Newest', 'Most Liked']}
                    defaultOption="Featured"
                    onChange={newVal => setSort(newVal)}
                />
                <button
                    className={Styles.postIdea}
                    onClick={() => navigate('/post-idea')}
                >
                    {'Post your idea'}
                </button>
            </div>
            <div className={Styles.ideaListWrapper}>
                {ideas?.map((idea, i) => (
                    <IdeaPanelAccordion
                        idea={idea}
                        key={`${idea.heading}-${i}`}
                        featured={idea.featured}
                    />
                ))}
            </div>
            <Pagination
                totalPages={pageCount}
                onPageChange={newPage => setPageNumber(newPage)}
            />
        </div>
    );
};

export default IdeaPanel;
