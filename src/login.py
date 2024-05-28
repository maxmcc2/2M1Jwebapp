from flask import Flask, request, jsonify, render_template
import mysql.connector

app = Flask(__name__)

# Database connection parameters
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'maxmccauley',
    'database': '2m1j'
}

@app.route('/login', methods=['POST'])
def login():
    uname = request.form['uname']
    password = request.form['password']
    
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)
        
        # Check credentials
        cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (uname, password))
        user = cursor.fetchone()
        
        if user:
            # User exists
            return jsonify({'status': 'success', 'message': 'Login successful!'}), 200
        else:
            # User does not exist or wrong credentials
            return jsonify({'status': 'fail', 'message': 'Invalid username or password!'}), 401
    
    except mysql.connector.Error as err:
        return jsonify({'status': 'error', 'message': str(err)}), 500
    
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    app.run(debug=True)


'''
import http.server
import socketserver
import cgi
import mysql.connector

PORT = 8000

class MyHttpRequestHandler(http.server.BaseHTTPRequestHandler):
    
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            with open('login.html', 'rb') as file:
                self.wfile.write(file.read())
        else:
            self.send_error(404, 'File not found')

    def do_POST(self):
        if self.path == '/':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            form = cgi.FieldStorage(
                fp=self.rfile,
                headers=self.headers,
                environ={'REQUEST_METHOD': 'POST'}
            )
            username = form.getvalue('username')
            password = form.getvalue('password')

            if verify_login(username, password):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b'Login successful!')
            else:
                self.send_response(401)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(b'Invalid username or password.')
        else:
            self.send_error(404, 'File not found')

def verify_login(username, password):
    try:
        # Connect to MySQL database
        db_connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="maxmccauley",
            database="2m1j"
        )

        # Create cursor object
        cursor = db_connection.cursor()

        # Execute SQL query to retrieve user with matching username and password
        query = "SELECT * FROM users WHERE username = %s AND password = %s"
        cursor.execute(query, (username, password))

        # Fetch result
        user = cursor.fetchone()

        if user:
            return True
        else:
            return False

    except mysql.connector.Error as error:
        print("Error while connecting to MySQL:", error)
        return False

    finally:
        # Close database connection
        if db_connection.is_connected():
            cursor.close()
            db_connection.close()

Handler = MyHttpRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Server started at localhost:" + str(PORT))
    httpd.serve_forever()
'''