const pool = require('../utils/sql-db')


const entries = {

    getUser_email: async (email) => {
        let client, result;
        try {
            client = await pool.connect();
            const sql_query = (`
                SELECT email, password FROM users WHERE email=$1
            `)
            result = await pool.query(sql_query, [email])
        } catch (err) {
            console.log('Error al coger el email ---> ' + err);
        } finally{
            client.release();
        }
        return result;
    },
    getUser_password: async (email) => {
        let client, result
        try {
            client = await pool.connect();
            const sql_query = (`
                SELECT password FROM users WHERE email=$1
            `)
            result = await pool.query(sql_query, [password])
        } catch (error) {
            console.log('Error al coger el password ---> ' + error);
        } finally {
            client.release();
        }
        return result;
    },
    getUser_id: async (email) => {
        let client, result
        try {
            client = await pool.connect();
            const sql_query = (`
                SELECT user_id FROM users WHERE email=$1
            `)
            result = await pool.query(sql_query, [email])
        } catch (error) {
            console.log('Error al coger el id ---> ' + error);
        } finally {
            client.release();
        }
        return result.rows[0].user_id;
    },
    setNew_user: async (username, email, password, age, occupation, location, skills) => {
        let client, result
        try {
            client = await pool.connect();
            const sql_query =
                "INSERT INTO users (username, email, password, age, occupation, location, skills) VALUES ($1, $2, $3, $4 ,$5, $6, $7)"
            result = await pool.query(sql_query, [username, email, password, age, occupation, location, skills])
        } catch (error) {
            console.log('Error al registrarse ----> ' + error);
        } finally {
            client.release();
        }
        return result;
    },
    setNewGoogle_user: async (username, email, password, location, image) => {
        let client, result
        try {
            client = await pool.connect();
            const sql_query =
                "INSERT INTO users (username, email, password, location, image) VALUES ($1, $2, $3, $4, $5)"
            result = await pool.query(sql_query, [username, email, password, location, image])
        } catch (error) {
            console.log('Error al registrarse con google----> ' + error);
        } finally {
            client.release();
        }
        return result;
    },
    isAdmin: async (email) => {
        let client, result;
        try {
            client = await pool.connect();
            const sql_query =
                "SELECT admin FROM users WHERE email=$1"
            result = await pool.query(sql_query, [email])
        } catch (error) {
            console.log('Error al comprabar si es admin ---> ' + error);
        } finally {
            client.release();
        }
        return result.rows[0].admin;
    },
    getInfo_allUsers: async () => {
        let client, result;
        try {
            client = await pool.connect();
            const sql_query =
                "SELECT username, email, age, occupation, location, skills FROM users"
            result = await pool.query(sql_query)
        } catch (error) {
            console.log('Error al sacar informacion de los users --> ' + error);
        } finally {
            client.release();
        }
        return result;
    },
    delete_user: async (email) => {
        let client, result;
        try {
            client = await pool.connect();
            const sql_query =
                "DELETE FROM users WHERE email=$1"
            result = await pool.query(sql_query, [email])
        } catch (error) {
            console.log('Error al borrar el user --> ' + error);
        } finally {
            client.release();
        }
        return result;
    },
    getInfo_byEmail: async (email) => {
        let client, result
        try {
            client = await pool.connect();
            const sql_query = (`
            SELECT username, email, age, occupation, location, skills, image FROM users WHERE email=$1
            `)
            result = await pool.query(sql_query, [email])
        } catch (error) {
            console.log('Error al coger el id ---> ' + error);
        } finally {
            client.release();
        }
        return result;
    },
    delete_user_byEmail: async(email) => {
        let client, result;
        try {
            client = await pool.connect();
            const sql_query = 
                "DELETE FROM users WHERE email=$1"
                result = await pool.query(sql_query, [email])
        } catch (error) {
            console.log('Error al borrar el user by email--> ' + error);
        }finally{
            client.release();
        }
        return result;
    },
    update_user: async (email, username, age, occupation, location, skills, image) => {
        let client, result;
        try {
            client = await pool.connect();
            const sql_query = (`
            UPDATE users
	            SET username=$2, age=$3, occupation=$4, location=$5, skills=$6, image=$7
	            WHERE email=$1;
            `)
            result = await pool.query(sql_query, [email, username, age, occupation, location, skills, image])
        } catch (error) {
            console.log('Error al editar el usuario --> ' + error);
        } finally {
            client.release();
        }
        return result;
    },
    insert_favJob: async (title, description, moreInfo, url ,user_id) => {
        let client, result;
        try {
            client = await pool.connect();
            const sql_query = (`
                INSERT INTO public.jobs(
	                    title, description, moreinfo, url ,user_id)
	                    VALUES ($1, $2, $3, $4, $5);
            `)
            result = await pool.query(sql_query, [title, description, moreInfo, url, user_id])
        } catch (error) {
            console.log('Ha ocurrido un error al meter un trabajo --' + erorr);
        } finally {
            client.release();
        }
        return result;
    },
    getFav_jobs: async (id) => {
        let client, result;
        try {
            client = await pool.connect();
            const sql_query = (`
                SELECT job_id, title, description, moreInfo, url FROM jobs WHERE user_id=$1;
            `)
            result = await pool.query(sql_query, [id])
        } catch (error) {
            console.log('Error al obtener trabajo favorito ---- ' + error);
        } finally {
            client.release();
        }
        return result.rows;
    },
    delete_favJob: async (job_id) => {
        let client, result;
        try {
            client = await pool.connect();
            const sql_query =
                "DELETE FROM jobs WHERE job_id=$1"
            result = await pool.query(sql_query, [job_id])
        } catch (error) {
            console.log('Error al borrar el trabajo --> ' + error);
        } finally {
            client.release();
        }
    },

}


module.exports = entries;