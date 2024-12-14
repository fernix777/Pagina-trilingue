import os
import sys
import traceback
from flask import Flask, render_template, request, jsonify, g
from flask_babel import Babel, gettext
from babel import Locale
from dotenv import load_dotenv

# Imprimir información de depuración
print("Python Version:", sys.version)
print("Current Working Directory:", os.getcwd())
print("Python Path:", sys.path)

# Cargar variables de entorno
load_dotenv()

app = Flask(__name__, 
            static_folder='static',  # Especificar carpeta estática
            template_folder='templates')  # Especificar carpeta de templates

# Configuración detallada
app.config.update(
    SECRET_KEY=os.getenv('SECRET_KEY', 'fallback_secret_key'),
    BABEL_DEFAULT_LOCALE=os.getenv('DEFAULT_LANGUAGE', 'es'),
    SUPPORTED_LANGUAGES=os.getenv('SUPPORTED_LANGUAGES', 'es,en,th').split(','),
    DEBUG=True
)

# Configuración de internacionalización
babel = Babel(app)

def get_locale():
    # Prioridad: parámetro de URL, cookie de usuario, encabezado Accept-Language, idioma por defecto
    try:
        locale = request.accept_languages.best_match(app.config['SUPPORTED_LANGUAGES']) or app.config['BABEL_DEFAULT_LOCALE']
        print(f"Selected Locale: {locale}")
        return locale
    except Exception as e:
        print(f"Error en get_locale: {e}")
        print(traceback.format_exc())
        return app.config['BABEL_DEFAULT_LOCALE']

babel.init_app(app, locale_selector=get_locale)

@app.before_request
def before_request():
    # Configurar traducción global
    try:
        current_locale = get_locale()
        print(f"Current locale: {current_locale}")  # Depuración
        g.locale = current_locale
        g.whatsapp_help_text = gettext('¿En qué podemos ayudarte?')
        print(f"WhatsApp help text: {g.whatsapp_help_text}")  # Depuración
    except Exception as e:
        print(f"Error en before_request: {e}")
        print(traceback.format_exc())

@app.route('/')
def index():
    try:
        print("Rendering index.html")
        return render_template('index.html')
    except Exception as e:
        print(f"Error en index: {e}")
        print(traceback.format_exc())
        return f"Error en index: {str(e)}", 500

@app.route('/contacto', methods=['POST'])
def contacto():
    try:
        data = request.json
        nombre = data.get('nombre')
        email = data.get('email')
        mensaje = data.get('mensaje')
        
        # Aquí iría la lógica de envío de correo o procesamiento del formulario
        # Por ahora, solo un ejemplo de respuesta
        return jsonify({
            'status': 'success',
            'message': gettext('Mensaje recibido correctamente')
        }), 200
    except Exception as e:
        print(f"Error en contacto: {e}")
        print(traceback.format_exc())
        return f"Error: {str(e)}", 500

@app.errorhandler(404)
def page_not_found(e):
    return "Página no encontrada", 404

@app.errorhandler(500)
def internal_server_error(e):
    print(f"Internal Server Error: {e}")
    print(traceback.format_exc())
    return "Internal Server Error", 500

if __name__ == '__main__':
    print("Iniciando aplicación Flask")
    app.run(debug=True, host='127.0.0.1', port=5000)
