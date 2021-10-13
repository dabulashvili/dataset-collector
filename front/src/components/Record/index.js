import React, { useEffect, useContext, useState } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import Backdrop from '@material-ui/core/Backdrop'
import { useSnackbar } from 'notistack'

import Audio from '../Audio'
import { UserContext } from '../../context/user-context'
import sentenceService from '../../services/sentence.service'
import recordService from '../../services/record.service'
import useStyles from './style'

export default function Record({ location, history, match }) {
    const classes = useStyles()
    const currentId = match.params.id
    const route = (id, sentence) => history.push(`/record/${id}`, { sentence })

    const { enqueueSnackbar } = useSnackbar()
    const { state: { user } } = useContext(UserContext)
    const [currentRecord, setCurrentRecord] = useState(null)
    const [sentence, setSentence] = useState(location.state ? location.state.sentence : {})
    const [allDone, setAllDone] = useState(false)
    const [loading, setLoading] = useState(false)
    const [record, setRecord] = useState(null)

    const afterRequest = () => {
        setLoading(false)
    }

    const skip = () => {
        setLoading(true)
        sentenceService.skip(user.accessToken, currentId).then(() => {
            next()
        }).finally(afterRequest)
    }

    const prev = () => {
        history.goBack()
    }

    const next = () => {
        sentenceService.next(user.accessToken).then(data => {
            if (data) {
                setSentence(data)
                route(data._id, data)
            } else {
                setAllDone(true)
            }
        }).finally(afterRequest)
    }

    const save = () => {
        setLoading(true)
        recordService.save(user.accessToken, sentence, currentRecord)
            .then(() => {
                enqueueSnackbar('Record saved successfully!', { variant: 'success' })
                setRecord(null)
                setCurrentRecord(null)
                next()
            }).catch(error => {
                enqueueSnackbar('Error saving record!', { variant: 'error' })
                console.error(error)
            }).finally(afterRequest)
    }

    const handleRecord = (recordBlob) => {
        setCurrentRecord(recordBlob)
    }

    useEffect(() => {
        document.title = sentence ? sentence.text : 'Record new'

        if (!currentId) {
            next()
        } else {
            Promise.all([
                recordService.getById(user.accessToken, currentId),
                sentenceService.getById(user.accessToken, currentId)
            ]).then(([record, sentence]) => {
                setRecord(record)
                setSentence(sentence)
                setLoading(false)
            })
        }
    }, [currentId, user.accessToken])

    return (
        <div>
            {
                allDone
                    ? <div>
                        <span className={classes.title} >
                            All Done!
                        </span>
                    </div>
                    : <div>
                        {loading && <LinearProgress />}
                        <Container maxWidth="sm">
                            <Box className={`${classes.root} ${loading && classes.disabled}`}>
                                <span className={classes.title}>
                                    ID - {sentence.order}
                                </span>
                                <span className={classes.title}>
                                    {sentence.text}
                                </span>
                                <Box className={classes.content}>
                                    <Box className={classes.mic}>
                                        <Audio prev={prev} skip={skip} handleRecord={handleRecord} saveRecord={save} currentUrl={record && record.url} />
                                    </Box>
                                </Box>
                            </Box>
                        </Container>
                        <Backdrop className={classes.backdrop} open={loading} />
                    </div>
            }
        </div>
    )
}