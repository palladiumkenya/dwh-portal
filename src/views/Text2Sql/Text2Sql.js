import { useState } from 'react';
import {
  Stack, Typography, TextField, Button, Box, Card, CardContent, IconButton, Tooltip,
  CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { FileCopy as FileCopyIcon } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Text2Sql = () => {
  const [query, setQuery] = useState('');
  const [sqlQuery, setSqlQuery] = useState('');
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState('');
  const [queryGenerated, setQueryGenerated] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlQuery).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  };

  const handleGenerateSQL = async () => {
    setLoading(true);
    setSqlQuery('');  // Clear previous SQL query
    setData([]);      // Clear previous data
    setColumns([]);   // Clear previous columns
    setError('');     // Clear previous error
    setQueryGenerated(false);
    try {
      const response = await fetch(BACKEND_URL + '/api/text2sql/query_from_natural_language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({ question: query }),
      });
      const result = await response.json();
      if (response.ok) {
        setSqlQuery(result.sql_query || '');  // Set SQL query or empty if not available
        setQueryGenerated(true);
        if (result.sql_query) {
          // await handleRunSQL(result.sql_query);  // Run the SQL query
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
      console.error("Error generating SQL:", error);
      setError('An unexpected error occurred while generating the SQL.');
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  p: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 800, p: 2 }}>
        <CardContent>
          <Stack spacing={3}>
            <Typography variant="h5" component="h2" gutterBottom>
              Text2SQL Generator
            </Typography>

            <TextField
              id="outlined-textarea"
              label="Enter your query"
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
                {loading ? <CircularProgress size={24} /> : "Generate SQL"}
              </Button>
            </Box>

            <Typography variant="body1" component="p">
              Your SQL query is here:
            </Typography>

            <Box sx={{ position: 'relative', p: 2, borderRadius: 1, overflow: 'hidden', bgcolor: '#f5f5f5', border: '1px solid #ddd' }}>
              <SyntaxHighlighter language="sql" style={materialLight}>
                {sqlQuery || 'SQL query will be shown here.'}
              </SyntaxHighlighter>
              <Tooltip title={copied ? "Copied!" : "Copy"}>
                <IconButton
                  onClick={handleCopy}
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'white', boxShadow: 1 }}
                  disabled={!sqlQuery}
                >
                  <FileCopyIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            <Typography variant="body1" component="p">
              Query Results:
            </Typography>

            {error && (
              <Typography variant="body2" color="error" component="p">
                {error}
              </Typography>
            )}

            {data.length > 0 ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell key={index}>{column}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column, colIndex) => (
                          <TableCell key={colIndex}>{row[column]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              queryGenerated && (
                <Box sx={{ position: 'relative', p: 2, borderRadius: 1, overflow: 'hidden', bgcolor: '#f5f5f5', border: '1px solid #ddd' }}>
                  <Typography variant="body2" component="p">
                    No results to display. Please generate and run a query.
                  </Typography>
                </Box>
              )
            )}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
};

export default Text2Sql;
