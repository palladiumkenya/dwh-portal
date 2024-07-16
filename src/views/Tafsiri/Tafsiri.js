import { useState } from 'react';
import {
    Stack,
    Typography,
    TextField,
    Button,
    Box,
    Card,
    CardContent,
    IconButton,
    Tooltip,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    Fab,
    Modal,
    Rating,
} from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import RateReviewIcon from '@mui/icons-material/RateReview';

const BACKEND_URL = process.env.REACT_APP_TEXT2SQL;
const SUPERSET_URL = process.env.REACT_APP_SUPERSET_URL;
const SUPERSET_USERNAME = process.env.REACT_APP_SUPERSET_USERNAME;
const SUPERSET_PASSWORD = process.env.REACT_APP_SUPERSET_PASSWORD;

const Tafsiri = () => {
    const [query, setQuery] = useState('');
    const [sqlQuery, setSqlQuery] = useState('');
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [queryGenerated, setQueryGenerated] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [feedbackSent, setFeedbackSent] = useState(false);
    const [feedbackError, setFeedbackError] = useState('');
    const [vizType, setVizType] = useState('table');
    const handleChange = (event) => {
        setVizType(event.target.value);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ratingValue, setRatingValue] = useState(2);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const handleCopy = () => {
        navigator.clipboard
            .writeText(sqlQuery)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error('Failed to copy text: ', err);
            });
    };

    const handleGenerateSQL = async () => {
        setLoading(true);
        setSqlQuery(''); // Clear previous SQL query
        setData([]); // Clear previous data
        setColumns([]); // Clear previous columns
        setError(''); // Clear previous error
        setQueryGenerated(false);
        console.log('Backend URL:' + BACKEND_URL);
        console.log('Superset URL' + SUPERSET_URL);
        try {
            const response = await fetch(
                BACKEND_URL + '/query_from_natural_language',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                    },
                    body: JSON.stringify({ question: query }),
                }
            );
            const result = await response.json();
            if (response.ok) {
                setSqlQuery(result.sql_query || ''); // Set SQL query or empty if not available
                setQueryGenerated(true);
                if (result.sql_query) {
                    const resultData = result.data || [];
                    setData(resultData);
                    if (resultData.length > 0) {
                        setColumns(Object.keys(resultData[0]));
                    } else {
                        setError('No data available for the given SQL query.');
                    }
                } else {
                    setError(result.message || 'Failed to execute SQL.');
                }
            }
        } catch (error) {
            console.error('Error generating SQL:', error);
            setError('An unexpected error occurred while generating the SQL.');
        } finally {
            setLoading(false);
        }
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    const handleFeedbackChange = (event) => {
        setFeedback(event.target.value);
    };

    const handleSendFeedback = async () => {
        if (!feedback) {
            setFeedbackError('Feedback cannot be empty.');
            return;
        }

        try {
            const response = await fetch(BACKEND_URL + '/send_feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                },
                body: JSON.stringify({ feedback }),
            });
            if (response.ok) {
                setFeedbackSent(true);
                setFeedback('');
                setFeedbackError('');
            } else {
                setFeedbackError(
                    'Failed to send feedback. Please try again later.'
                );
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            setFeedbackError(
                'An unexpected error occurred while sending feedback.'
            );
        }
    };
    // Handles running the query on Apache Superset
    const handleSuperset = async () => {
        setLoading(true);
        try {
            // Get Access token from Superset
            const response = await fetch(
                SUPERSET_URL + '/api/v1/security/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                    },
                    body: JSON.stringify({
                        password: SUPERSET_PASSWORD,
                        provider: 'db',
                        refresh: true,
                        username: SUPERSET_USERNAME,
                    }),
                }
            );
            if (response.ok) {
                const result = await response.json();
                console.log('Logged in to Superset:', result);
                const accessToken = result.access_token;
                const date = new Date()
                    .toISOString()
                    .replace(/[-:.]/g, '')
                    .replace('T', '_')
                    .split('.')[0];
                // Save Query on Superset
                const response2 = await fetch(
                    SUPERSET_URL + '/api/v1/saved_query/',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: '*/*',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify({
                            db_id: 2,
                            description: '',
                            label: 'tafsiriquery' + date,
                            sql: sqlQuery,
                            schema: 'dbo',
                        }),
                    }
                );
                // Open Superset on New tab with the saved query
                if (response2.ok) {
                    const result2 = await response2.json();
                    console.log('Saved query on Superset:', result2);
                    window
                        .open(
                            SUPERSET_URL + '/sqllab?savedQueryId=' + result2.id,
                            '_blank'
                        )
                        .focus();
                } else {
                    console.error('Failed to save query on Superset.');
                }
            } else {
                console.error('Failed to save query on Superset.');
            }
        } catch (error) {
            console.error('Error logging in to Superset:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
            }}
        >
            <Card sx={{ width: '100%', maxWidth: 800, p: 2 }}>
                <CardContent>
                    <Stack spacing={3}>
                        <Typography
                            variant="h2"
                            component="h2"
                            gutterBottom
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                p: 2,
                            }}
                        >
                            TAFSIRI
                        </Typography>
                        <Typography
                            variant="h6"
                            component="h6"
                            gutterBottom
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <em>
                                Trasformational AI For SQL Inferences and
                                Reporting Integration
                            </em>
                        </Typography>

                        <TextField
                            id="outlined-textarea"
                            label="Enter your question"
                            placeholder="What would you like to ask today..."
                            multiline
                            fullWidth
                            variant="outlined"
                            value={query}
                            onChange={handleQueryChange}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ textTransform: 'none' }}
                                onClick={handleGenerateSQL}
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    'Generate'
                                )}
                            </Button>
                        </Box>

                        <Typography variant="body1" component="p">
                            Your SQL query is here:
                        </Typography>

                        <Box
                            sx={{
                                position: 'relative',
                                p: 2,
                                borderRadius: 1,
                                overflow: 'hidden',
                                bgcolor: '#f5f5f5',
                                border: '1px solid #ddd',
                            }}
                        >
                            <SyntaxHighlighter
                                language="sql"
                                style={materialLight}
                            >
                                {sqlQuery || 'SQL query will be shown here.'}
                            </SyntaxHighlighter>
                            <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                                <IconButton
                                    onClick={handleCopy}
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        bgcolor: 'white',
                                        boxShadow: 1,
                                    }}
                                    disabled={!sqlQuery}
                                >
                                    <FileCopyIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {data.length > 0 ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography variant="body1" component="p">
                                    Query Results:
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        sx={{ textTransform: 'none' }}
                                        onClick={handleSuperset}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} />
                                        ) : (
                                            'Run on Superset'
                                        )}
                                    </Button>
                                </Box>

                                {/* <FormControl sx={{ width: 320 }}>
                  <InputLabel id="labelVizType">Select Visualization</InputLabel>
                  <Select labelId="labelVizType" id="vizType" value={vizType} onChange={handleChange} label="Select Visualization">
                    <MenuItem value="table">Table</MenuItem>
                    <MenuItem value="pie-chart">Pie Chart</MenuItem>
                    <MenuItem value="bar-chart">Bar Chart</MenuItem>
                  </Select>
                </FormControl> */}
                            </div>
                        ) : null}

                        {error && (
                            <Typography
                                variant="body2"
                                color="error"
                                component="p"
                            >
                                {error}
                            </Typography>
                        )}

                        {data.length > 0 ? (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column, index) => (
                                                <TableCell key={index}>
                                                    {column}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data.map((row, rowIndex) => (
                                            <TableRow key={rowIndex}>
                                                {columns.map(
                                                    (column, colIndex) => (
                                                        <TableCell
                                                            key={colIndex}
                                                        >
                                                            {row[column]}
                                                        </TableCell>
                                                    )
                                                )}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            queryGenerated && (
                                <Box
                                    sx={{
                                        position: 'relative',
                                        p: 2,
                                        borderRadius: 1,
                                        overflow: 'hidden',
                                        bgcolor: '#f5f5f5',
                                        border: '1px solid #ddd',
                                    }}
                                >
                                    <Typography variant="body2" component="p">
                                        No results to display. Please generate
                                        and run a query.
                                    </Typography>
                                </Box>
                            )
                        )}
                    </Stack>
                </CardContent>
            </Card>
            {data.length > 0 ? (
                <div>
                    <Fab
                        aria-label="edit"
                        onClick={handleOpen}
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            bgcolor: '#1976d2',
                            color: 'white',
                            '&:hover': {
                                bgcolor: '#1565c0',
                            },
                        }}
                    >
                        <RateReviewIcon />
                    </Fab>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography variant="body1" component="h3">
                                How was your experience using TAFSIRI?
                            </Typography>
                            <Rating
                                name="simple-controlled"
                                value={ratingValue}
                                onChange={(event, newValue) => {
                                    setRatingValue(newValue);
                                }}
                            />
                            <TextField
                                id="outlined-feedback"
                                label="Your feedback"
                                placeholder="Let us know what you think..."
                                multiline
                                fullWidth
                                variant="outlined"
                                value={feedback}
                                onChange={handleFeedbackChange}
                            />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ textTransform: 'none' }}
                                    onClick={handleSendFeedback}
                                >
                                    Send Feedback
                                </Button>
                            </Box>
                            {feedbackError && (
                                <Typography
                                    variant="body2"
                                    color="error"
                                    component="p"
                                >
                                    {feedbackError}
                                </Typography>
                            )}
                            <Snackbar
                                open={feedbackSent}
                                autoHideDuration={6000}
                                onClose={() => setFeedbackSent(false)}
                                message="Feedback sent successfully!"
                            />
                        </Box>
                    </Modal>
                </div>
            ) : null}
        </Box>
    );
};

export default Tafsiri;
