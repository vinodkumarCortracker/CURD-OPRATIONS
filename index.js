const http = require('http')
const sql = require('mssql')
const express = require('express')
const bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = 5000

var config = {
    user: "sa",
    password: 'Test@123',
    server: '10.38.0.105',
    port: 1434,
    options: {
        trustedconnection: true,
        enableArithAort: true,
        instancename: 'WIN-RVBJS380SPR\MSSQLSERVER1',
        trustServerCertificate: true
    },
    database: 'InternTest'
}

// To retrive or read a Partner 
app.post('/get_partner/:id', async (req, res) => {
    try {
        let data = req.params.id;
        let pool = await sql.connect(config)

        let details = await pool.request()
            .input('p_id', sql.Int, data)
            .query(`select * from p_partner where p_id = @p_id`)
        let partner_data = details.recordsets
        res.send(partner_data)

    }
    catch (err) {
        res.send({ 'err': err.message, '00': 9 })
    }
})

// To add Row or Partner intothe table
app.post('/create_partner', async (req, res) => {
    try {
        let data = req.body
        let pool = await sql.connect(config)
        let details = await pool.request()
            .input('p_name', sql.NVarChar, data.p_name)
            .input('p_dba', sql.NVarChar, data.p_pda)
            .input('p_alias', sql.NVarChar, data.p_alias)
            .input('p_type', sql.NVarChar, data.p_type)
            .input('p_relationship', sql.NVarChar, data.p_relationship)
            .input('p_address1', sql.NVarChar, data.p_address1)
            .input('p_address2', sql.NVarChar, data.p_address2)
            .input('p_address3', sql.NVarChar, data.p_address3)
            .input('p_city', sql.NVarChar, data.p_city)
            .input('p_state', sql.NVarChar, data.p_state)
            .input('p_postal_code', sql.NVarChar, data.p_postal_code)
            .input('p_country', sql.NVarChar, data.p_country)
            .input('p_website', sql.NVarChar, data.p_website)
            .input('p_phone', sql.NVarChar, data.p_phone)
            .input('p_fax', sql.NVarChar, data.p_fax)
            .input('p_toll_free', sql.NVarChar, data.p_toll_free)
            .input('p_internal_sales_rep', sql.Int, data.p_internal_sales_rep)
            .input('p_supp_terms', sql.NVarChar, data.p_supp_terms)
            .input('p_terms', sql.NVarChar, data.p_terms)
            .input('p_status', sql.NVarChar, data.p_status)
            .input('p_comments', sql.NVarChar, data.p_comments)
            .input('p_ship', sql.NVarChar, data.p_ship)
            .input('p_es_cust_id', sql.NVarChar, data.p_es_cust_id)
            .input('p_ac_batch_flag_c', sql.Int, data.p_ac_batch_flag_c)
            .input('p_ac_batch_flag_s', sql.Int, data.p_ac_batch_flag_s)
            .input('p_ac_batch_id', sql.Int, data.p_ac_batch_id)
            .input('p_es_supp_id', sql.NVarChar, data.p_es_supp_id)
            .input('p_site_id', sql.Int, data.p_site_id)
            .input('p_customer_status', sql.Int, data.p_customer_status)
            .input('p_supplier_status', sql.Int, data.p_supplier_status)
            .input('temp_p_id', sql.Char, data.temp_p_id)
            .input('p_vendor_status', sql.Int, data.p_vendor_status)
            .input('p_group_id', sql.Int, data.p_group_id)
            .query(`
                    INSERT INTO p_partner (
                        p_name,
                        p_dba,
                        p_alias,
                        p_type,
                        p_relationship,
                        p_address1,
                        p_address2,
                        p_address3,
                        p_city,
                        p_state,
                        p_postal_code,
                        p_country,
                        p_website,
                        p_phone,
                        p_fax,                            p_toll_free,
                        p_internal_sales_rep,
                        p_supp_terms,
                        p_terms,
                        p_status,
                        p_comments,
                        p_ship,
                        p_es_cust_id,
                        p_ac_batch_flag_c,
                        p_ac_batch_flag_s,
                        p_ac_batch_id,
                        p_es_supp_id,
                        p_site_id,
                        p_customer_status,
                        temp_p_id,
                        p_vendor_status,
                        p_group_id
                    )
                    VALUES(
                        @p_name,
                        @p_dba,
                        @p_alias,
                        @p_type,
                        @p_relationship,
                        @p_address1,
                        @p_address2,                            @p_address3,
                        @p_city,
                        @p_state,
                        @p_postal_code,
                        @p_country,
                        @p_website,
                        @p_phone,
                        @p_fax,                            @p_toll_free,
                        @p_internal_sales_rep,
                        @p_supp_terms,
                        @p_terms,
                        @p_status,
                        @p_comments,
                        @p_ship,
                        @p_es_cust_id,                            @p_ac_batch_flag_c,
                        @p_ac_batch_flag_s,
                        @p_ac_batch_id,
                        @p_es_supp_id,
                        @p_site_id,
                        @p_customer_status,
                        @temp_p_id,
                        @p_vendor_status,                            @p_group_id
                    )
               select * from p_partner where p_id in (select max(p_id) from p_partner);
                    `)
        let partner_data = details.recordsets[0];
        res.send({ partner_data });

    } catch (err) { res.send(err.message) }
})

// To update or to change the values of a partner
app.post('/update_partner/:id', async (req, res) => {
    console.log('eoor0')
    try {
        console.log('error')
        let p_id = req.params.id
        let data = req.body
        let pool = await sql.connect(config)
        let details = await pool.request()
            .input('p_id', sql.Int, p_id)
            .input('p_city', sql.NVarChar, data.p_city)
            .query(`
                    UPDATE p_partner
                    SET
                    p_city=@p_city
                    WHERE 
                    p_id=@p_id;
                    select * from p_partner where p_id=@p_id;
            `)
        let partner_data = details.recordsets[0];
        res.send(partner_data);
    } catch (err) { res.send(err.message) }
})

// To update the status of the customer 
app.post('/update_status/:id', async (req, res) => {
    try {
        const p_id = req.params.id
        const status = req.body.status
        const pool = await sql.connect(config)
        let status_details = await pool.request()
            .input('p_id', sql.Int, p_id)
            .query(`select p_status from p_partner where p_id = @p_id;`)
        let status_data = status_details.recordset[0].p_status
        console.log(status)
        if (status_data === status) {
            res.send({ message: 'conditon already exists' })
            return
        }
        else {
            await pool.request()
                .input('p_id', sql.Int, p_id)
                .input('p_status', sql.NVarChar, status)
                .query(
                    `UPDATE p_partner 
                    SET 
                    p_status=@p_status
                    WHERE 
                    p_id=@p_id`
                )
            res.send({ message: "Status is changed" });
            return;
        }
    } catch (err) { res.send(err.message) }
})

app.get('/hlo', (req, res) => {
    try {
        res.send('hello message')
    }
    catch (err) {
        res.send(err.message)
    }
})

app.listen(port, () => {
    console.log(`Server running at the port ${port}`)
})