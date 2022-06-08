using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace lasomas.Models
{
  public partial class lasomasContext : DbContext
  {
    public lasomasContext()
    {
    }

    public lasomasContext(DbContextOptions<lasomasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Clasificacion> Clasificacions { get; set; }
    public virtual DbSet<Cliente> Clientes { get; set; }
    public virtual DbSet<Detallepedido> Detallepedidos { get; set; }
    public virtual DbSet<Estado> Estados { get; set; }
    public virtual DbSet<Etapa> Etapas { get; set; }
    public virtual DbSet<Formapago> Formapagos { get; set; }
    public virtual DbSet<Pedido> Pedidos { get; set; }
    public virtual DbSet<Producto> Productos { get; set; }
    public virtual DbSet<Rol> Rols { get; set; }
    public virtual DbSet<Tipodocumento> Tipodocumentos { get; set; }
    public virtual DbSet<Usuario> Usuarios { get; set; }
    public virtual DbSet<StockHistorico> StockHistoricos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
      {
        optionsBuilder.UseMySQL("Server=localhost;Database=lasomas;Uid=root;Pwd=123456;");
      }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Clasificacion>(entity =>
      {
        entity.HasKey(e => e.IdClasificacion)
                  .HasName("PRIMARY");

        entity.ToTable("clasificacion");

        entity.Property(e => e.IdClasificacion).HasColumnName("idClasificacion");

        entity.Property(e => e.Descripcion)
                  .HasMaxLength(50)
                  .HasColumnName("descripcion");
      });

      modelBuilder.Entity<Cliente>(entity =>
      {
        entity.HasKey(e => e.IdCliente)
                  .HasName("PRIMARY");

        entity.ToTable("cliente");

        entity.HasIndex(e => e.IdEstado, "idEstado");

        entity.HasIndex(e => e.IdTipoDoc, "idTipoDoc");

        entity.Property(e => e.IdCliente).HasColumnName("idCliente");

        entity.Property(e => e.Apellido)
                  .HasMaxLength(100)
                  .HasColumnName("apellido");

        entity.Property(e => e.CuilCuit).HasMaxLength(50);

        entity.Property(e => e.FechaNacimiento)
                  .HasColumnType("date")
                  .HasColumnName("fechaNacimiento");

        entity.Property(e => e.IdEstado).HasColumnName("idEstado");

        entity.Property(e => e.IdTipoDoc).HasColumnName("idTipoDoc");

        entity.Property(e => e.Nombre)
                  .HasMaxLength(100)
                  .HasColumnName("nombre");

        entity.Property(e => e.NumDoc).HasColumnName("numDoc");
        // VER POSIBLE ERROR
        /*  entity.HasOne(d => d.IdEstadoNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdEstado)
                    .HasConstraintName("cliente_ibfk_2");

          entity.HasOne(d => d.IdTipoDocNavigation)
                    .WithMany(p => p.Clientes)
                    .HasForeignKey(d => d.IdTipoDoc)
                    .HasConstraintName("cliente_ibfk_1");*/
        //
      });

      modelBuilder.Entity<Detallepedido>(entity =>
      {
        entity.HasKey(e => e.IdDetallePedido)
                  .HasName("PRIMARY");

        entity.ToTable("detallepedido");

        entity.HasIndex(e => e.IdProducto, "idProducto");

        entity.HasIndex(e => e.NroPedido, "nroPedido");

        entity.Property(e => e.IdDetallePedido).HasColumnName("idDetallePedido");

        entity.Property(e => e.Cantidad).HasColumnName("cantidad");

        entity.Property(e => e.IdProducto).HasColumnName("idProducto");

        entity.Property(e => e.NroPedido).HasColumnName("nroPedido");

        entity.Property(e => e.Precio)
                  .HasColumnType("decimal(10,0)")
                  .HasColumnName("precio");
        // VER POSIBLE ERROR
        /*   entity.HasOne(d => d.IdProductoNavigation)
                     .WithMany(p => p.Detallepedidos)
                     .HasForeignKey(d => d.IdProducto)
                     .HasConstraintName("detallepedido_ibfk_2");

           entity.HasOne(d => d.NroPedidoNavigation)
                     .WithMany(p => p.Detallepedidos)
                     .HasForeignKey(d => d.NroPedido)
                     .HasConstraintName("detallepedido_ibfk_1");*/
        //
      });

      modelBuilder.Entity<Estado>(entity =>
      {
        entity.HasKey(e => e.IdEstado)
                  .HasName("PRIMARY");

        entity.ToTable("estado");

        entity.Property(e => e.IdEstado).HasColumnName("idEstado");

        entity.Property(e => e.Descripcion)
                  .HasMaxLength(50)
                  .HasColumnName("descripcion");
      });

      modelBuilder.Entity<Etapa>(entity =>
      {
        entity.HasKey(e => e.IdEtapa)
                  .HasName("PRIMARY");

        entity.ToTable("etapa");

        entity.Property(e => e.IdEtapa).HasColumnName("idEtapa");

        entity.Property(e => e.Descripcion)
                  .HasMaxLength(50)
                  .HasColumnName("descripcion");
      });

      modelBuilder.Entity<Formapago>(entity =>
      {
        entity.HasKey(e => e.IdFormaPago)
                  .HasName("PRIMARY");

        entity.ToTable("formapago");

        entity.Property(e => e.IdFormaPago).HasColumnName("idFormaPago");

        entity.Property(e => e.Descripcion)
                  .HasMaxLength(50)
                  .HasColumnName("descripcion");
      });

      modelBuilder.Entity<Pedido>(entity =>
      {
        entity.HasKey(e => e.NroPedido)
                  .HasName("PRIMARY");

        entity.ToTable("pedido");

        entity.HasIndex(e => e.IdCliente, "idCliente");

        entity.HasIndex(e => e.IdEtapa, "idEtapa");

        entity.HasIndex(e => e.IdFormaPago, "idFormaPago");

        entity.HasIndex(e => e.IdUsuario, "idUsuario");

        entity.Property(e => e.NroPedido).HasColumnName("nroPedido");

        entity.Property(e => e.Fecha)
                  .HasColumnType("date")
                  .HasColumnName("fecha");

        entity.Property(e => e.IdCliente).HasColumnName("idCliente");

        entity.Property(e => e.IdEtapa).HasColumnName("idEtapa");

        entity.Property(e => e.IdFormaPago).HasColumnName("idFormaPago");

        entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");
        // VER POSIBLE ERROR
        /*    entity.HasOne(d => d.IdClienteNavigation)
                       .WithMany(p => p.Pedidos)
                       .HasForeignKey(d => d.IdCliente)
                       .HasConstraintName("pedido_ibfk_1");

             entity.HasOne(d => d.IdEtapaNavigation)
                       .WithMany(p => p.Pedidos)
                       .HasForeignKey(d => d.IdEtapa)
                       .HasConstraintName("pedido_ibfk_4");

             entity.HasOne(d => d.IdFormaPagoNavigation)
                       .WithMany(p => p.Pedidos)
                       .HasForeignKey(d => d.IdFormaPago)
                       .HasConstraintName("pedido_ibfk_3");

             entity.HasOne(d => d.IdUsuarioNavigation)
                       .WithMany(p => p.Pedidos)
                       .HasForeignKey(d => d.IdUsuario)
                       .HasConstraintName("pedido_ibfk_2");*/
        //
      });

      modelBuilder.Entity<Producto>(entity =>
      {
        entity.HasKey(e => e.IdProducto)
                  .HasName("PRIMARY");

        entity.ToTable("producto");

        entity.HasIndex(e => e.IdClasificacion, "idClasificacion");

        entity.HasIndex(e => e.IdEstado, "idEstado");

        entity.Property(e => e.IdProducto).HasColumnName("idProducto");

        entity.Property(e => e.Cantidad).HasColumnName("cantidad");

        entity.Property(e => e.Descripcion)
                  .HasMaxLength(200)
                  .HasColumnName("descripcion");

        entity.Property(e => e.IdClasificacion).HasColumnName("idClasificacion");

        entity.Property(e => e.IdEstado).HasColumnName("idEstado");

        entity.Property(e => e.Nombre)
                  .HasMaxLength(100)
                  .HasColumnName("nombre");

        entity.Property(e => e.Precio)
                  .HasColumnType("decimal(10,0)")
                  .HasColumnName("precio");
        // VER POSIBLE ERROR
        /*    entity.HasOne(d => d.IdClasificacionNavigation)
                      .WithMany(p => p.Productos)
                      .HasForeignKey(d => d.IdClasificacion)
                      .HasConstraintName("producto_ibfk_1");

            entity.HasOne(d => d.IdEstadoNavigation)
                      .WithMany(p => p.Productos)
                      .HasForeignKey(d => d.IdEstado)
                      .HasConstraintName("producto_ibfk_2");*/
        //
      });

      modelBuilder.Entity<Rol>(entity =>
      {
        entity.HasKey(e => e.IdRol)
                  .HasName("PRIMARY");

        entity.ToTable("rol");

        entity.Property(e => e.IdRol).HasColumnName("idRol");

        entity.Property(e => e.Descripcion)
                  .HasMaxLength(50)
                  .HasColumnName("descripcion");
      });

      modelBuilder.Entity<Tipodocumento>(entity =>
      {
        entity.HasKey(e => e.IdTipoDoc)
                  .HasName("PRIMARY");

        entity.ToTable("tipodocumento");

        entity.Property(e => e.IdTipoDoc).HasColumnName("idTipoDoc");

        entity.Property(e => e.Descripcion)
                  .HasMaxLength(50)
                  .HasColumnName("descripcion");
      });

      modelBuilder.Entity<Usuario>(entity =>
      {
        entity.HasKey(e => e.IdUsuario)
                  .HasName("PRIMARY");

        entity.ToTable("usuario");

        entity.HasIndex(e => e.IdEstado, "idEstado");

        entity.HasIndex(e => e.IdRol, "idRol");

        entity.HasIndex(e => e.IdTipoDoc, "idTipoDoc");

        entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

        entity.Property(e => e.Apellido)
                  .HasMaxLength(100)
                  .HasColumnName("apellido");

        entity.Property(e => e.Clave)
                  .HasMaxLength(100)
                  .HasColumnName("clave");

        entity.Property(e => e.Email)
                  .HasMaxLength(100)
                  .HasColumnName("email");

        entity.Property(e => e.FechaNacimiento)
                  .HasColumnType("date")
                  .HasColumnName("fechaNacimiento");

        entity.Property(e => e.IdEstado).HasColumnName("idEstado");

        entity.Property(e => e.IdRol).HasColumnName("idRol");

        entity.Property(e => e.IdTipoDoc).HasColumnName("idTipoDoc");

        entity.Property(e => e.Nombre)
                  .HasMaxLength(100)
                  .HasColumnName("nombre");

        entity.Property(e => e.NumDoc).HasColumnName("numDoc");
        // VER POSIBLE ERROR
        /*   entity.HasOne(d => d.IdEstadoNavigation)
                     .WithMany(p => p.Usuarios)
                     .HasForeignKey(d => d.IdEstado)
                     .HasConstraintName("usuario_ibfk_3");

           entity.HasOne(d => d.IdRolNavigation)
                     .WithMany(p => p.Usuarios)
                     .HasForeignKey(d => d.IdRol)
                     .HasConstraintName("usuario_ibfk_2");

           entity.HasOne(d => d.IdTipoDocNavigation)
                     .WithMany(p => p.Usuarios)
                     .HasForeignKey(d => d.IdTipoDoc)
                     .HasConstraintName("usuario_ibfk_1");*/
        //
      });

      modelBuilder.Entity<StockHistorico>(entity =>
      {
        entity.HasKey(e => e.Id)
                  .HasName("PRIMARY");

        entity.ToTable("stockhistorico");

        entity.Property(e => e.Fecha)
                  .HasColumnType("date")
                  .HasColumnName("fecha");

        entity.Property(e => e.IdProducto).HasColumnName("idProducto");

        entity.Property(e => e.Precio)
                  .HasColumnType("decimal(10,0)")
                  .HasColumnName("precio");

        entity.Property(e => e.Cantidad).HasColumnName("cantidad");

        entity.Property(e => e.Observaciones)
                  .HasMaxLength(100)
                  .HasColumnName("observaciones");

      });



      OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
  }
}
