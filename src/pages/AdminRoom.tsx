
    import { /* FormEvent, useEffect,  */useState } from 'react';
    import { useNavigate, useParams } from 'react-router-dom'
    import { database } from '../services/firebase';

    import LogoImg from '../assets/images/logo.svg';
    import { Button } from '../components/Button';
    import { RoomCode } from '../components/RoomCode';
/*     import { useAuth } from '../hooks/useAuth'; */
    import { useRoom } from '../hooks/useRoom';

    import { Questions } from '../components/Questions';
    import deleteSVG from '../assets/images/delete.svg'
    import '../style/room.scss';



    type RoomParams = {
        id: string;
    }

    export function AdminRoom(){
        const params = useParams<RoomParams>();  
/*         const { user } = useAuth();
        const [newQuestion, setNewQuestion] = useState('');  */
        const roomId = params.id;
        const {title, questions} = useRoom(roomId!);
        const navigate = useNavigate();

        async function handleDeleteQuestion(questionId: string) {
            if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
                await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
            }
          }


        async function handleEndRoom(){
            await database.ref(`rooms/${roomId}`).update({
                endedAt : new Date()
            });
            navigate('/');
        }
        
        return(
            <div id="page-room">
                <header>
                    <div className="content">
                        <img src={LogoImg} alt="Letmeask" />
                        <div>
                            <RoomCode code={roomId! /* || '' tambem funcionaria*/}
                            />
                            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                        </div>
                    </div>
                </header>

                <main>
                    <div className="roomTitle">
                        <h1>Sala {title}</h1>
                        { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                    </div>

                    <div className="question-list">
                    {questions.map(question => {
                        return(
                            <Questions
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            >
                                <button
                                type='button'
                                onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteSVG} alt="Remover pergunta" />
                                </button>
                            </Questions>
                        );
                    })}
                    </div>
                </main>
            </div>
        );
    }