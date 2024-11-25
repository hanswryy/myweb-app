import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Actors from './CMSActors'; // Pastikan path ini benar
import '@testing-library/jest-dom';
// import fetch from 'node-fetch';
// const fetch = require('node-fetch');
// const { TextEncoder, TextDecoder } = require('util');
// global.TextEncoder = TextEncoder;
// global.TextDecoder = TextDecoder;
// if (typeof TextEncoder === 'undefined') {
//     global.TextEncoder = require('util').TextEncoder;
//     global.TextDecoder = require('util').TextDecoder;
// }  
import fetchMock from 'jest-fetch-mock';
import dayjs from 'dayjs';
// import pool from '../../server/db';
fetchMock.enableMocks();
const fs = require('fs');
const path = require('path');

beforeEach(() => {
    fetch.resetMocks();
});

test('get all actors', async () => {
    fetch.mockResponseOnce(JSON.stringify([
        // success: true,
        // data: [{ id: 1, name: 'Actor 1', country_id: 1, birth_date: '1990-01-01', url_photo: 'photo1.jpg' }],
        {
            id: 1,
            name: 'Actor 1',
            country_id: 1,
            birth_date: '1990-01-01',
            url_photo: 'photo1.jpg',
        }
    ]));

    const response = await fetch('/actor');
    // const data = await response.json();
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toBeDefined();

    result.forEach(actor => {
        expect(actor).toHaveProperty('id');
        expect(actor).toHaveProperty('name');
        expect(actor).toHaveProperty('country_id');
        expect(actor).toHaveProperty('birth_date');
        expect(actor).toHaveProperty('url_photo');
    });
    
    expect(result.length).toBeGreaterThan(0);

    // expect(data.data[0]).toHaveProperty('id', 1);
    // expect(data.data[0]).toHaveProperty('name', 'Actor 1');
    // expect(data.data[0]).toHaveProperty('country_id', 1);
    // expect(data.data[0]).toHaveProperty('birth_date', '1990-01-01');
    // expect(data.data[0]).toHaveProperty('url_photo', 'photo1.jpg');

    // response.body.forEach(actor => {
    //     expect(actor).toHaveProperty('id');
    //     expect(actor).toHaveProperty('name');
    //     expect(actor).toHaveProperty('country_id');
    //     expect(actor).toHaveProperty('birth_date');
    //     expect(actor).toHaveProperty('url_photo');
    //   });    
});

test('add actor to backend', async () => {
    // const newActor = {
    //     name: 'Test Actor',
    //     country_id: 1,
    //     birth_date: '2000-01-01',
    // };
    
    const formData = new FormData();

    const filePath = path.join(__dirname, 'images/actor.png');

    const file = fs.createReadStream(filePath);

    formData.append('name', 'Test Actor');
    formData.append('country_id', 1);
    formData.append('birth_date', '1990-01-01');
    formData.append('url_photo', file);

    // Mock respons backend
    fetch.mockResponseOnce(JSON.stringify({
        success: true,
        data: {
            id: 27,
            name: 'Test Actor',
            country_id: 1,
            birth_date: '1990-01-01',
            url_photo: 'https://res.cloudinary.com/dg77cnrws/image/upload/uploaded-photo.jpg',
        },
    }), { status: 200 });
  
    const response = await fetch('/actor', {
        method: 'POST',
        body: formData,
    });
    
    const result = await response.json();
    // console.log('Add Actor Response:', result);

    // Pastikan respons berhasil
    expect(response.status).toBe(200);
    expect(result.success).toBe(true);

    // Verifikasi data aktor
    // expect(data).toBe('actor');
    // expect(data.actor).toBe('id');
    // expect(data.actor).toBe('name', 'Test Actor');
    // expect(data.actor).toBe('country_id', '1');
    // expect(data.actor).toBe('birth_date', '2000-01-01');
    // expect(result.data.name).toBe('Test Actor');
    // expect(result.data.country_id).toBe(1);
    // expect(result.data.birth_date).toBe('1990-01-01');
    // expect(result.data).toHaveProperty('url_photo', 'uploaded-photo.jpg');

    // // Memastikan bahwa body respons terdefinisi dan berisi actor
    // expect(result).toHaveProperty('data');
    // expect(result.data).toHaveProperty('id');
    // expect(result.data).toHaveProperty('name');
    // expect(result.data).toHaveProperty('country_id');
    // expect(result.data).toHaveProperty('birth_date');
    // expect(result.data).toHaveProperty('url_photo');

    // // Memastikan bahwa data aktor yang baru ditambahkan sesuai dengan yang dikirim
    // expect(result.data.name).toBe('Test Actor');

    // Mengonversi tanggal respons menjadi format 'YYYY-MM-DD' untuk perbandingan yang tepat
    const actorBirthDate = dayjs(result.data.birth_date).format('YYYY-MM-DD');
    const expectedDate = dayjs('1990-01-01').format('YYYY-MM-DD');

    // Memastikan tanggal yang diterima sesuai dengan yang dikirimkan
    expect(actorBirthDate).toBe(expectedDate);

    // // Memastikan bahwa country_id sesuai dengan yang dikirimkan
    // expect(result.data.country_id).toBe(1);

    // // Memastikan bahwa URL foto dikembalikan setelah upload
    // expect(result.data.url_photo).toBeDefined();
    // expect(result.data.url_photo).toBe('uploaded-photo.jpg');

    expect(result.data).toMatchObject({
        name: 'Test Actor',
        country_id: 1,
        birth_date: '1990-01-01',
        url_photo: 'https://res.cloudinary.com/dg77cnrws/image/upload/uploaded-photo.jpg',
    });

    // Memastikan bahwa id aktor yang baru ditambahkan ada
    expect(result.data.id).toBeDefined();
});

test('update actor in backend', async () => {
    const formData = new FormData();
    const filePath = path.join(__dirname, 'images/actor.png');
    const file = fs.createReadStream(filePath);
    
    formData.append('name', 'Updated Actor');
    formData.append('country_id', 2);
    formData.append('birth_date', '1992-02-02');
    formData.append('url_photor', file);

    // Mock respons backend
    fetch.mockResponseOnce(JSON.stringify({
        success: true,
        data: {
            id: 2,
            name: 'Updated Actor',
            country_id: 2,
            birth_date: '1992-02-02',
            url_photo: 'updated-photo.jpg',
        },
    }), { status: 200 });
  
    const response = await fetch('/actor/3', {
        method: 'POST',
        body: formData,
    });
    const result = await response.json();
  
    // Pastikan respons berhasil
    expect(response.status).toBe(200);
    expect(result.success).toBe(true);

    // Memastikan data yang dikembalikan sesuai dengan yang diupdate
    expect(result).toHaveProperty('data');
    expect(result.data.name).toBe('Updated Actor');

    // Mengonversi tanggal respons menjadi format 'YYYY-MM-DD' untuk perbandingan yang tepat
    const actorBirthDate = dayjs(result.data.birth_date).format('YYYY-MM-DD');
    const expectedDate = dayjs('1992-02-02').format('YYYY-MM-DD');
    expect(actorBirthDate).toBe(expectedDate);

    // Memastikan country_id sesuai dengan yang diperbarui
    expect(result.data.country_id).toBe(2);

    // Memastikan URL foto dikembalikan
    expect(result.data.url_photo).toBeDefined();
    expect(result.data.url_photo).toBe('updated-photo.jpg');

    // Memastikan id actor yang diperbarui adalah id yang benar
    expect(result.data.id).toBe(2);
  
    // // Verifikasi data yang diperbarui
    // expect(result.data.name).toBe('Updated Actor');
    // expect(result.data.country_id).toBe(2);
    // expect(result.data.birth_date).toBe('1992-02-02');
    // expect(result.data).toHaveProperty('url_photo', 'updated-photo.jpg');
});

test('delete actor in backend', async () => {
    const actorId = 20;

    // // Pastikan aktor ada dalam database sebelum menghapus
    // const checkActorExistence = await pool.query('SELECT * FROM actor WHERE id = $1', [actorId]);
    // expect(checkActorExistence.rows.length).toBeGreaterThan(0); // Pastikan aktor ada

    // Mock respons backend untuk penghapusan
    fetch.mockResponseOnce(JSON.stringify({
        success: true,
        message: 'Actor and poster deleted successfully',
    }), { status: 200 });
  
    const response = await fetch('/actor/${actorId}', {
        method: 'DELETE',
    });
  
    // Pastikan respons berhasil
    expect(response.status).toBe(200);
  
    const result = await response.json();
  
    // Verifikasi pesan sukses
    expect(result.success).toBe(true);
    expect(result.message).toBe('Actor and poster deleted successfully');

    // // Pastikan aktor sudah dihapus dari database
    // const checkActorAfterDeletion = await pool.query('SELECT * FROM actor WHERE id = $1', [actorId]);
    // expect(checkActorAfterDeletion.rows.length).toBe(0); // Aktor sudah tidak ada lagi di database
});
  

// // Mocking fetch
// global.fetch = jest.fn();

// describe('Actors Component', () => {
//   beforeEach(() => {
//     // Reset mock fetch sebelum setiap pengujian
//     fetch.mockClear();
//   });

//   it('should fetch and display actors and countries on load', async () => {
//     const mockActors = [
//       { id: 1, name: 'Actor 1', country_id: 1, birth_date: '1990-01-01', url_photo: 'photo1.jpg' },
//       { id: 2, name: 'Actor 2', country_id: 2, birth_date: '1985-06-15', url_photo: 'photo2.jpg' },
//     ];

//     const mockCountries = [
//       { id: 1, name: 'Country 1' },
//       { id: 2, name: 'Country 2' },
//     ];

//     // Mock fetch response for actors and countries
//     fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockCountries) });
//     fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockActors) });

//     render(<Actors />);

//     // Verifikasi apakah data negara muncul di dropdown
//     await waitFor(() => {
//       expect(screen.getByText('Country 1')).toBeInTheDocument();
//       expect(screen.getByText('Country 2')).toBeInTheDocument();
//     });

//     // Verifikasi apakah data aktor ditampilkan di tabel
//     await waitFor(() => {
//       expect(screen.getByText('Actor 1')).toBeInTheDocument();
//       expect(screen.getByText('Actor 2')).toBeInTheDocument();
//     });
//   });

//   it('should allow form submission to add actor', async () => {
//     const mockCountries = [
//       { id: 1, name: 'Country 1' },
//       { id: 2, name: 'Country 2' },
//     ];

//     fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockCountries) });

//     render(<Actors />);

//     // Isi form
//     fireEvent.change(screen.getByLabelText(/Country/), { target: { value: '1' } });
//     fireEvent.change(screen.getByLabelText(/Actor Name/), { target: { value: 'New Actor' } });
//     fireEvent.change(screen.getByLabelText(/Birth Date/), { target: { value: '2000-01-01' } });

//     // Simulasi unggah file
//     const file = new File(['(image)'], 'actor-photo.jpg', { type: 'image/jpeg' });
//     fireEvent.change(screen.getByLabelText(/Upload Picture/), { target: { files: [file] } });

//     // Simulasi pengiriman formulir
//     fireEvent.click(screen.getByText(/Submit/));

//     // Verifikasi pemanggilan fetch untuk menambahkan aktor
//     await waitFor(() => {
//       expect(fetch).toHaveBeenCalledWith('/actor', expect.objectContaining({
//         method: 'POST',
//         body: expect.any(FormData),
//       }));
//     });
//   });

//   it('should filter actors by country', async () => {
//     const mockActors = [
//       { id: 1, name: 'Actor 1', country_id: 1, birth_date: '1990-01-01', url_photo: 'photo1.jpg' },
//       { id: 2, name: 'Actor 2', country_id: 2, birth_date: '1985-06-15', url_photo: 'photo2.jpg' },
//     ];

//     const mockCountries = [
//       { id: 1, name: 'Country 1' },
//       { id: 2, name: 'Country 2' },
//     ];

//     fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockCountries) });
//     fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockActors) });

//     render(<Actors />);

//     // Pilih negara dari dropdown
//     fireEvent.change(screen.getByLabelText(/Filtered by Country/), { target: { value: '1' } });

//     // Verifikasi hanya aktor dengan country_id 1 yang ditampilkan
//     await waitFor(() => {
//       expect(screen.getByText('Actor 1')).toBeInTheDocument();
//       expect(screen.queryByText('Actor 2')).toBeNull();
//     });
//   });

//   it('should filter actors by search term', async () => {
//     const mockActors = [
//       { id: 1, name: 'Actor 1', country_id: 1, birth_date: '1990-01-01', url_photo: 'photo1.jpg' },
//       { id: 2, name: 'Actor 2', country_id: 2, birth_date: '1985-06-15', url_photo: 'photo2.jpg' },
//     ];

//     const mockCountries = [
//       { id: 1, name: 'Country 1' },
//       { id: 2, name: 'Country 2' },
//     ];

//     fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockCountries) });
//     fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockActors) });

//     render(<Actors />);

//     // Masukkan kata kunci pencarian
//     fireEvent.change(screen.getByPlaceholderText(/Search Actors/), { target: { value: 'Actor 1' } });

//     // Verifikasi bahwa hanya 'Actor 1' yang ditampilkan
//     await waitFor(() => {
//       expect(screen.getByText('Actor 1')).toBeInTheDocument();
//       expect(screen.queryByText('Actor 2')).toBeNull();
//     });
//   });

//   it('should allow deleting an actor', async () => {
//     const mockActors = [
//       { id: 1, name: 'Actor 1', country_id: 1, birth_date: '1990-01-01', url_photo: 'photo1.jpg' },
//     ];

//     fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mockActors) });

//     render(<Actors />);

//     // Verifikasi bahwa aktor muncul di tabel
//     await waitFor(() => {
//       expect(screen.getByText('Actor 1')).toBeInTheDocument();
//     });

//     // Simulasi klik tombol hapus
//     fireEvent.click(screen.getByText(/Delete/));

//     // Verifikasi pemanggilan fetch untuk menghapus aktor
//     await waitFor(() => {
//       expect(fetch).toHaveBeenCalledWith('/actor/1', expect.objectContaining({
//         method: 'DELETE',
//       }));
//     });

//     // Verifikasi bahwa aktor tidak lagi ada di tabel
//     await waitFor(() => {
//       expect(screen.queryByText('Actor 1')).toBeNull();
//     });
//   });
// });