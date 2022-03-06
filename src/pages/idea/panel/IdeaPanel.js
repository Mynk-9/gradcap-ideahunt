import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import IdeaPanelAccordion from '../../../components/ideapanelaccordion/IdeaPanelAccordion';
import Pagination from '../../../components/pagination/Pagination';

import Styles from '../Idea.module.scss';

import InputSelect from './../../../components/inputselect/InputSelect';

const IdeaPanel = () => {
    let navigate = useNavigate();
    const [sort, setSort] = useState('featured');
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [ideas, setIdeas] = useState(null);
    const nPerPage = 10;

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_SERVER}ideas/count`)
            .then(resp => {
                const ideaCount = parseInt(resp.data.count);
                setPageCount(Math.ceil(ideaCount / nPerPage));
            })
            .catch(error => {
                console.log('Page count fetch error', error);
            });

        axios
            .get(`${process.env.REACT_APP_SERVER}ideas`, {
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
