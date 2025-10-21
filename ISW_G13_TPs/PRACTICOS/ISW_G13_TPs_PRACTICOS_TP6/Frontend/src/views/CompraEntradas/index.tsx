import React, { useState } from 'react';

const CompraEntradas = () => {
    const [formData, setFormData] = useState({
        fecha: '',
        cantidad: 1,
        edades: [''],
        tipoPase: 'regular',
        formaPago: 'tarjeta',
        email: 'carla.gomez@hotmail.com',
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCantidadChange = (e) => {
        const valorInput = e.target.value;
        let nuevaCantidad = parseInt(valorInput, 10);
        if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
             if (valorInput === '') {
                 setFormData(prev => ({ ...prev, cantidad: '', edades: [] }));
                 return;
             }
             nuevaCantidad = 1;
        }
        if (nuevaCantidad > 10) {
            nuevaCantidad = 10;
        }
        setFormData(prev => ({
            ...prev,
            cantidad: nuevaCantidad,
            edades: Array.from({ length: nuevaCantidad }, (_, i) => prev.edades[i] || ''),
        }));
    };

    const handleEdadChange = (index, value) => {
        const nuevasEdades = [...formData.edades];
        nuevasEdades[index] = value;
        setFormData(prev => ({ ...prev, edades: nuevasEdades }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setError('');
        setMensaje('');
        try {
            const response = await fetch('/api/entradas/comprar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    cantidad: Number(formData.cantidad),
                    edades: formData.edades.map(edad => parseInt(edad, 10)),
                }),
            });
            const resultado = await response.json();
            if (!response.ok) throw new Error(resultado.mensaje || 'Ocurrió un error');
            setMensaje(`¡${resultado.mensaje}! Tu compra ha sido procesada.`);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#E8FCCF] flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-[#134611] mb-8">Compra de Entradas</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="fecha" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Visita</label>
                            <input type="date" id="fecha" name="fecha" value={formData.fecha} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3DA35D] focus:border-[#3DA35D]" required />
                        </div>
                        <div>
                            <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 mb-1">Cantidad (Máx. 10)</label>
                            <input
                                type="number"
                                id="cantidad"
                                name="cantidad"
                                value={formData.cantidad}
                                onChange={handleCantidadChange}
                                placeholder="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3DA35D] focus:border-[#3DA35D]"
                                required
                            />
                        </div>
                    </div>
                    {formData.edades.length > 0 && (
                        <div>
                            <h3 className="text-md font-medium text-gray-700 mb-2">Edades de los Visitantes</h3>
                            {/* --- CAMBIO AQUÍ --- */}
                            {/* Se agregó una altura fija (h-24) y overflow-y-auto para el scroll */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 h-24 overflow-y-auto pr-2">
                                {formData.edades.map((edad, index) => (
                                    <div key={index}><input type="number" placeholder={`Edad ${index + 1}`} value={edad} onChange={(e) => handleEdadChange(index, e.target.value)} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3DA35D] focus:border-[#3DA35D]" required /></div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="tipoPase" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Pase</label>
                            <select id="tipoPase" name="tipoPase" value={formData.tipoPase} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3DA35D] focus:border-[#3DA35D]"><option value="regular">Regular ($5000)</option><option value="VIP">VIP ($10000)</option></select>
                        </div>
                        <div>
                            <label htmlFor="formaPago" className="block text-sm font-medium text-gray-700 mb-1">Forma de Pago</label>
                            <select id="formaPago" name="formaPago" value={formData.formaPago} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3DA35D] focus:border-[#3DA35D]"><option value="tarjeta">Tarjeta</option><option value="efectivo">Efectivo</option></select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email del Comprador</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3DA35D] focus:border-[#3DA35D]" required />
                    </div>
                    <div>
                        <button type="submit" disabled={cargando} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#134611] hover:bg-[#3E8914] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3DA35D] disabled:bg-[#96E072]">{cargando ? 'Procesando...' : 'Confirmar Compra'}</button>
                    </div>
                </form>

                {mensaje && <div className="mt-6 p-4 bg-[#96E072] bg-opacity-30 border border-[#3DA35D] text-[#134611] rounded-md">{mensaje}</div>}
                {error && <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">{error}</div>}
            </div>
        </div>
    );
};

export default CompraEntradas;

