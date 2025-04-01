import { Router } from 'express';
import { storeExcelData, getStoredExcelData } from '../../service/upload';

const router = Router();
console.log('test server',);
// Upload Excel file
router.post('/data', async (req, res) => {
    try {
        await storeExcelData(req);
        res.status(200).json({ message: 'JSON data uploaded and processed successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

router.get('/data', async (req, res) => {
    try {
        console.log('test server= ',);
        const data = await getStoredExcelData();
        res.status(200).json(data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});


export default router;
