import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';
import '../css/custom-css.css';
import '../i18n'; // Make sure this file is imported to initialize i18n
import { useTranslation } from 'react-i18next';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
});

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      info {
        next
        prev
        pages
      }
      results {
        name
        status
        species
        gender
        image
        origin {
          name
        }
      }
    }
  }
`;

const Characters = ({ page, setPage }) => {
    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { page },
    });
    const { t } = useTranslation();

    if (loading) return <p className="text-center display-2">{t('Loading')}</p>;
    if (error) return <p className="text-center display-2 text-primary-emphasis">{t('error')}: {error.message}</p>;

    const { results, info } = data.characters;

    return (
        <>
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-primary me-3" disabled={!info.prev} onClick={() => setPage(page - 1)}>
                    {t('previous')}
                </button>
                <span className="align-self-center">{t('page')} {page}</span>
                <button className="btn btn-primary ms-3" style={{ width: "80px" }} disabled={!info.next} onClick={() => setPage(page + 1)}>
                    {t('next')}
                </button>
            </div>

            <div className="row">
                {results.map((char) => (
                    <div className="col-4 pb-3" key={char.id}>
                        <div className="card">
                            <img className="card-img-top" src={char.image} style={{ height: '300px' }} />
                            <div className="card-body">
                                <h5 className="card-title fw-bolder">{char.name}</h5>
                                <ul className="list-unstyled">
                                    <li className={`fw-bolder text-${char.status === 'Alive' ? 'success' : char.status === 'unknown' ? 'warning' : 'danger'}`}>
                                        {t('status')}: {char.status}
                                    </li>
                                    <li>{t('species')}: {char.species}</li>
                                    <li>{t('gender')}: {char.gender}</li>
                                    <li>{t('origin')}: {char.origin.name}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default function App() {
    const [page, setPage] = useState(1);
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <ApolloProvider client={client}>
            <div id="main">
                <div className="container-fluid" style={{ zIndex: 2 }}>
                    <div className="row">
                        <p className="display-1 text-center text-primary-emphasis text-decoration-underline pb-3">{t('title')}</p>
                        <Characters page={page} setPage={setPage} />
                    </div>
                    <div className='row text-bg-primary text-center fixed-bottom align-content-center pt-2' style={{ height: "50px" }}>
                        <p>
                            <span className='me-2'>{t('footer')}</span>
                            <a className="text-light" href="#" onClick={() => changeLanguage('en')}>{t('language_en')}</a>|
                            <a className="text-light" href="#" onClick={() => changeLanguage('de')}>{t('language_ger')}</a>
                        </p>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    );
}
